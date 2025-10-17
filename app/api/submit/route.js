import { NextResponse } from "next/server";
import { z } from "zod";
import { google } from "googleapis";
import { FormSchema } from '@/assets/schema/formSchema';

export async function POST(req, res) {

  if (req.method !== 'POST') {
    // return res.status(405).send({ message: 'Only POST Requests are allowed' })
    return NextResponse.json(
      { ok: false, error: z.treeifyError(parsed.error) }, //parsed.error.flatten() },
      { status: 400,
        message: "Only POST Requests are allowed"
       }
    )
  }

  const body = await req.json();
  const parsed = FormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: z.treeifyError(parsed.error) }, //parsed.error.flatten() },
      { status: 400,
        message: "Invalid Form Data"
       }
    );
  }

  const { name, phNumber, startDate, endDate, breakfast, lunch, dinner, } = parsed.data;

  // Data row(match your headers order)
  const values = [
    [
      name,
      phNumber,
      startDate,
      endDate,
      breakfast,
      lunch,
      dinner,
      new Date().toLocaleString(), // Timestamp (UTC)
    ],
  ];

  try {
    // Prepare auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n')
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets"
      ]
    });

    const sheets = google.sheets({
      auth,
      version: 'v4'
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:I",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values }
    })

    console.log(body.name, body.phNumber);
    // console.log(response.data.updates.updatedData);

    return NextResponse.json({ ok: true, result: response.data });
    // return res.status(200).json({
    //   data: response.data
    // })

  } catch (e) {
    console.log(e);
    // return res.status(500).send({message: "Something went wrong."})
    return NextResponse.json({ ok: false, message: "Something went wrong." }, { status: 500 });

  }
}

// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ SOLUTION 2 =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

// export const runtime = "nodejs"; // IMPORTANT: googleapis needs Node runtime (not Edge)

// console.log({
//   hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//   keyLength: process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? process.env.GOOGLE_SERVICE_ACCOUNT_KEY.length : 0,
//   keyHasEscapedNewlines: !!(process.env.GOOGLE_SERVICE_ACCOUNT_KEY && process.env.GOOGLE_SERVICE_ACCOUNT_KEY.includes("\\n"))
// });

// const FormSchema = z.object({
//   name: z.string().min(1),
//   phNumber: z.string().min(10).max(10),
//   startDate: z.string().min(1), // ISO or dd/mm/yyyy
//   endDate: z.string().min(1),
//   breakfast: z.boolean(),
//   lunch: z.boolean(),
//   dinner: z.boolean(),
// });

// const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// const SHEET_RANGE = "Sheet1!A:I"; // adjust to match your columns

// function getAuthFromEnv() {
//   //   // Option A: Base64 whole JSON
//   //   const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64;
//   //   if (b64) {
//   //     const json = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
//   //     return new google.auth.JWT(
//   //       json.client_email,
//   //       undefined,
//   //       json.private_key,
//   //       SCOPES
//   //     );
//   //   }

//   // Option B: Separate env vars
//   const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
//   let key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

//   if (email && key) {
//     // Fix escaped newlines if needed
//     // key = key.replace(/\\n/g, "\n");
//     return new google.auth.JWT(email, null, key, SCOPES);
//   }

//   throw new Error("Service account credentials not configured");
// }

// export async function POST(req) {

//   try {
//     const body = await req.json();
//     const parsed = FormSchema.safeParse(body);
//     if (!parsed.success) {
//       return NextResponse.json(
//         { ok: false, error: z.treeifyError(parsed.error) }, //parsed.error.flatten() },
//         { status: 400 }
//       );
//     }

//     const { name, phNumber, startDate, endDate, breakfast, lunch, dinner, } = parsed.data;

//     const auth = getAuthFromEnv();
//     const sheets = google.sheets({ version: "v4", auth });

//     const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//     if (!spreadsheetId) {
//       console.log("spreadsheet fault")
//       return NextResponse.json(
//         { ok: false, error: "Missing GOOGLE_SHEET_ID" },
//         { status: 500 }
//       );
//     }

//     // Data row (match your headers order)
//     const values = [
//       [
//         name,
//         phNumber,
//         startDate,
//         endDate,
//         breakfast,
//         lunch,
//         dinner,
//         new Date().toISOString(), // Timestamp (UTC)
//       ],
//     ];

//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: SHEET_RANGE,
//       valueInputOption: "USER_ENTERED",
//       insertDataOption: "INSERT_ROWS",
//       requestBody: { values },
//     });

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     // Log server-side, return generic message client-side
//     console.error("Sheets append error:", err?.response?.data || err);
//     return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req) {

//   try {
//     const body = await req.json().catch((e) => {
//       throw new Error("Invalid JSON in request body: " + String(e));
//     });
//     // console.log("Received body:", body);

//     const parsed = FormSchema.safeParse(body);
//     if (!parsed.success) {
//       console.warn("Validation failed:", parsed.error.flatten());
//       return NextResponse.json({ ok: false, error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
//     }

//     // If you want to temporarily bypass recaptcha for testing, set env: SKIP_RECAPTCHA=true
//     // if (!process.env.SKIP_RECAPTCHA) {
//     //   const token = parsed.data.recaptchaToken;
//     //   const ok = await verifyRecaptcha(token);
//     //   if (!ok) {
//     //     console.warn("recaptcha failed for token:", token);
//     //     return NextResponse.json({ ok: false, error: "recaptcha failed" }, { status: 403 });
//     //   }
//     // } else {
//     //   console.log("SKIP_RECAPTCHA set — not verifying token");
//     // }

//     const auth = getAuthFromEnv();
//     try {
//       await auth.authorize();
//       console.log("Auth OK");
//     } catch (e) {
//       console.error("Auth authorization error:", e.message || e);
//       throw e; // so you see it in the server response during dev
//     }

//     // const auth = getAuthFromEnv();
//     // await auth.authorize().catch(err => {
//     //   throw new Error("Auth authorization error: " + (err?.message || err));
//     // });

//     const sheets = google.sheets({ version: "v4", auth });

//     const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//     if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID");

//     const { name, phNumber, startDate, endDate, breakfast, lunch, dinner } = parsed.data;

//     const values = [[
//       name,
//       phNumber,
//       startDate,
//       endDate,
//       breakfast,
//       lunch,
//       dinner,
//       new Date().toISOString(),
//     ]];

//     console.log("Appending values:", values);

//     const resp = await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: SHEET_RANGE,
//       valueInputOption: "RAW",        // keep booleans as booleans for checkboxes
//       insertDataOption: "INSERT_ROWS",
//       requestBody: { values },
//     });

//     console.log("Sheets API response:", resp.data);
//     return NextResponse.json({ ok: true, result: resp.data });
//   } catch (err) {
//     console.error("Submit handler error:", err);
//     // In development show full error; in prod, return generic message
//     const isDev = process.env.NODE_ENV !== "production";
//     return NextResponse.json(
//       { ok: false, error: isDev ? String(err) : "Server error" },
//       { status: 500 }
//     );
//   }
// }
