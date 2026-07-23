"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  FileText,
  Edit3,
  ArrowLeft,
  CheckCircle,
  Printer,
  Share2,
  AlertTriangle,
  Stamp,
  Users,
  Shield,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { getDocumentBySlug } from "@/data/documents";
import { getCategoryBySlug } from "@/data/categories";
import { formatDate } from "@/lib/utils";

function renderEStampHeader(formData: Record<string, string>, docName: string): string {
  const stampNo = formData["e_stamp_number"] || formData["stamp_number"];
  const stampState = formData["stamp_state"] || "DELHI (NCT)";
  const stampDuty = formData["stamp_duty_amount"] || "100";
  const certDate = formData["e_stamp_date"] || formatDate(new Date());

  if (stampNo) {
    return `
<div style="border: 2px double #1e3a8a; padding: 14px 18px; margin-bottom: 24px; background-color: #f8fafc; border-radius: 6px; font-family: sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; margin-bottom: 10px;">
    <div>
      <span style="font-size: 12px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">GOVERNMENT OF INDIA / OFFICIAL e-STAMP CERTIFICATE</span>
      <p style="font-size: 10px; color: #475569; margin: 2px 0 0 0;">Issued by Stock Holding Corporation of India Limited (SHCIL) & Govt of ${stampState}</p>
    </div>
    <div style="text-align: right; background: #dcfce7; border: 1px solid #16a34a; padding: 4px 8px; border-radius: 4px;">
      <span style="font-size: 10px; font-weight: bold; color: #15803d; text-transform: uppercase;">✔ VERIFIED e-STAMP</span>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; color: #1e293b; line-height: 1.5;">
    <div><strong>Certificate No:</strong> <span style="font-family: monospace; font-size: 12px; color: #1e3a8a; font-weight: bold;">${stampNo}</span></div>
    <div><strong>Certificate Issued Date:</strong> ${certDate}</div>
    <div><strong>Stamp Duty Amount:</strong> ₹${stampDuty}/-</div>
    <div><strong>Document Type:</strong> ${docName}</div>
  </div>
  <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 9.5px; color: #64748b; text-align: center;">
    To verify certificate authenticity online, visit <strong>https://www.shcilestamp.com</strong> or scan QR code on official e-Stamp paper.
  </div>
</div>`;
  }
  return "";
}

// ─── Document Renderer ────────────────────────────────────────
function renderDocumentContent(
  templateId: string,
  formData: Record<string, string>
): string {
  const get = (key: string, fallback = "_______________") =>
    formData[key] || `[${fallback}]`;

  const today = formatDate(new Date());

  switch (templateId) {
    case "rent-agreement":
      return `
<div class="doc-preview" style="font-family:'Times New Roman',serif;font-size:13px;line-height:2;color:#111;max-width:700px;margin:0 auto;padding:24px;">

${renderEStampHeader(formData, "Rent Agreement")}

<div style="text-align:center;margin-bottom:28px;">
  <h1 style="font-size:22px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">RENT AGREEMENT</h1>
  <p style="font-size:12px;color:#555;">(Non-Judicial Stamp Paper)</p>
</div>

<p>This <strong>RENT AGREEMENT</strong> is made and entered into at ${get("property_address", "place")}, on this <strong>${today}</strong></p>

<p style="margin-top:20px;"><strong>BETWEEN</strong></p>

<p><strong>${get("landlord_name")}</strong>, residing at ${get("landlord_address")}, hereinafter referred to as the <strong>"LANDLORD"</strong> (which expression shall unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, successors, executors, administrators, legal representatives and assigns) of the <strong>FIRST PART</strong>;</p>

<p style="text-align:center;font-weight:bold;margin:8px 0;">AND</p>

<p><strong>${get("tenant_name")}</strong>, residing at ${get("tenant_address")}, hereinafter referred to as the <strong>"TENANT"</strong> (which expression shall unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, successors, executors, administrators, legal representatives and assigns) of the <strong>SECOND PART</strong>.</p>

<div style="border-top:1px solid #333;margin:24px 0;"></div>

<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">RECITALS</h2>

<p>WHEREAS the Landlord is the lawful owner and in possession of the property situated at <strong>${get("property_address")}</strong> (hereinafter referred to as <strong>"the Premises"</strong>).</p>

<p>AND WHEREAS the Tenant has requested the Landlord to let out the said Premises, and the Landlord has agreed to let out the same to the Tenant, on the terms and conditions as set forth herein.</p>

<div style="border-top:1px solid #333;margin:24px 0;"></div>

<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">NOW THEREFORE, IN CONSIDERATION OF THE MUTUAL COVENANTS HEREIN:</h2>

<p><strong>1. PREMISES:</strong> The Landlord hereby agrees to let out and the Tenant agrees to take on rent the Premises described as: <strong>${get("property_address")}</strong>, on a <strong>${get("property_type", "residential")}</strong> basis.</p>

<p><strong>2. TERM:</strong> The tenancy shall commence from <strong>${get("lease_start_date")}</strong> and shall be for a period of <strong>${get("lease_duration_months")} months</strong>, unless sooner terminated in accordance with the provisions herein.</p>

<p><strong>3. RENT:</strong> The Tenant agrees to pay the Landlord a monthly rent of <strong>₹${get("monthly_rent")}/- (${get("rent_in_words")})</strong> per month, payable on or before the <strong>${get("rent_due_date")}th</strong> day of each calendar month. Payment shall be made by <strong>${get("payment_mode", "bank transfer")}</strong>.</p>

<p><strong>4. SECURITY DEPOSIT:</strong> The Tenant has paid to the Landlord a refundable security deposit of <strong>₹${get("security_deposit")}/-</strong>, which shall be refunded to the Tenant at the time of vacating the Premises, after deducting any outstanding dues or damages caused by the Tenant.</p>

<p><strong>5. LOCK-IN PERIOD:</strong> ${
  get("lock_in_period", "none") !== "[none]" && get("lock_in_period", "none") !== "none"
    ? `Neither party shall terminate this agreement during the initial lock-in period of <strong>${get("lock_in_period")} months</strong>.`
    : "There is no lock-in period applicable to this agreement."
}</p>

<p><strong>6. NOTICE PERIOD:</strong> Either party wishing to terminate this agreement shall give a written notice of <strong>${get("notice_period", "30")} days</strong> to the other party.</p>

<p><strong>7. MAINTENANCE:</strong> Society maintenance charges shall be borne by the <strong>${get("maintenance_paid_by", "Tenant")}</strong>. Electricity charges shall be paid as per actual consumption by the <strong>${get("electricity_bill", "Tenant")}</strong>. Water charges shall be borne by the <strong>${get("water_bill", "Tenant")}</strong>.</p>

${
  get("additional_clauses")
    ? `<p><strong>8. ADDITIONAL TERMS:</strong> ${get("additional_clauses")}</p>`
    : ""
}

<p><strong>9. GENERAL CONDITIONS:</strong></p>
<p style="margin-left:20px;">a) The Tenant shall use the Premises only for residential/stated purposes and shall not sublet or assign the Premises without prior written consent of the Landlord.</p>
<p style="margin-left:20px;">b) The Tenant shall maintain the Premises in good condition and shall not make any structural alterations without the Landlord's consent.</p>
<p style="margin-left:20px;">c) The Landlord shall have the right to inspect the Premises at reasonable times with prior notice of 24 hours.</p>
<p style="margin-left:20px;">d) The Tenant shall comply with all rules, regulations, and bye-laws of the housing society/local authority.</p>

<div style="border-top:1px solid #333;margin:32px 0;"></div>

<p>IN WITNESS WHEREOF, the parties hereto have signed this Agreement on the day and year first mentioned above.</p>

<div style="display:flex;justify-content:space-between;margin-top:48px;gap:40px;">
  <div style="flex:1;text-align:center;">
    <div style="border-top:1px solid #333;margin-top:50px;padding-top:8px;">
      <p style="font-size:12px;"><strong>${get("landlord_name")}</strong></p>
      <p style="font-size:11px;color:#555;">Landlord</p>
    </div>
  </div>
  <div style="flex:1;text-align:center;">
    <div style="border-top:1px solid #333;margin-top:50px;padding-top:8px;">
      <p style="font-size:12px;"><strong>${get("tenant_name")}</strong></p>
      <p style="font-size:11px;color:#555;">Tenant</p>
    </div>
  </div>
</div>

<div style="margin-top:48px;">
  <p style="font-weight:bold;font-size:12px;margin-bottom:24px;">WITNESSES:</p>
  <div style="display:flex;justify-content:space-between;gap:40px;">
    <div style="flex:1;text-align:center;">
      <div style="border-top:1px solid #333;margin-top:40px;padding-top:8px;">
        <p style="font-size:11px;color:#555;">Witness 1 (Name & Sign)</p>
      </div>
    </div>
    <div style="flex:1;text-align:center;">
      <div style="border-top:1px solid #333;margin-top:40px;padding-top:8px;">
        <p style="font-size:11px;color:#555;">Witness 2 (Name & Sign)</p>
      </div>
    </div>
  </div>
</div>

</div>`;

    case "general-affidavit":
      return `
<div class="doc-preview" style="font-family:'Times New Roman',serif;font-size:13px;line-height:2;color:#111;max-width:700px;margin:0 auto;padding:24px;">

<div style="text-align:center;margin-bottom:28px;">
  <h1 style="font-size:22px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;">AFFIDAVIT</h1>
</div>

<p>I, <strong>${get("deponent_name")}</strong>, aged <strong>${get("deponent_age")} years</strong>, son/daughter/wife of <strong>${get("deponent_father_name")}</strong>, residing at <strong>${get("deponent_address")}</strong>${get("deponent_occupation") ? `, by occupation <strong>${get("deponent_occupation")}</strong>` : ""}, do hereby solemnly affirm and declare as under:</p>

<div style="border:1px solid #999;padding:20px 24px;margin:24px 0;border-radius:4px;background:#fafafa;">
  <p style="margin:0;">${get("declaration_content", "That I declare the following facts...")}</p>
</div>

<p style="margin-top:20px;">That the contents of this Affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therein.</p>

<div style="margin-top:40px;text-align:right;">
  <p><strong>DEPONENT</strong></p>
  <div style="border-top:1px solid #333;margin-top:50px;padding-top:8px;display:inline-block;min-width:200px;text-align:center;">
    <p style="font-size:12px;"><strong>${get("deponent_name")}</strong></p>
  </div>
</div>

<div style="margin-top:40px;border-top:1px solid #ddd;padding-top:20px;">
  <p style="font-style:italic;font-size:12px;">Verified at <strong>${get("place_of_declaration")}</strong> on this <strong>${get("date_of_declaration")}</strong> that the contents of the above Affidavit are true and correct to the best of my knowledge and belief and nothing has been concealed therein.</p>
  
  <div style="margin-top:40px;">
    <p><strong>Before me:</strong></p>
    <div style="border-top:1px solid #333;margin-top:60px;padding-top:8px;display:inline-block;min-width:220px;text-align:center;">
      <p style="font-size:11px;color:#555;">Notary Public / Magistrate</p>
      <p style="font-size:11px;color:#555;">Seal & Signature</p>
    </div>
  </div>
</div>

</div>`;

    case "nda":
      return `
<div class="doc-preview" style="font-family:'Times New Roman',serif;font-size:13px;line-height:2;color:#111;max-width:700px;margin:0 auto;padding:24px;">

<div style="text-align:center;margin-bottom:28px;">
  <h1 style="font-size:20px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;">NON-DISCLOSURE AGREEMENT</h1>
  <p style="font-size:12px;color:#555;">(Confidentiality Agreement)</p>
</div>

<p>This <strong>Non-Disclosure Agreement</strong> (hereinafter referred to as the <strong>"Agreement"</strong>) is entered into as of <strong>${get("agreement_date", today)}</strong></p>

<p><strong>BETWEEN:</strong></p>
<p><strong>${get("disclosing_party_name")}</strong>, a ${get("disclosing_party_type")}, having its principal place of business at ${get("disclosing_party_address")} (hereinafter referred to as the <strong>"Disclosing Party"</strong>);</p>

<p style="text-align:center;font-weight:bold;">AND</p>

<p><strong>${get("receiving_party_name")}</strong>, a ${get("receiving_party_type")}, having its principal place of business at ${get("receiving_party_address")} (hereinafter referred to as the <strong>"Receiving Party"</strong>).</p>

<p>Both parties are collectively referred to herein as the <strong>"Parties"</strong>.</p>

<div style="border-top:1px solid #333;margin:20px 0;"></div>

<p><strong>1. PURPOSE:</strong> The Parties wish to explore ${get("purpose_of_disclosure", "a potential business relationship")} and may disclose certain confidential and proprietary information to each other.</p>

<p><strong>2. DEFINITION OF CONFIDENTIAL INFORMATION:</strong> "Confidential Information" shall mean any and all information or data that has or could have commercial value or other utility in the business in which the Disclosing Party is engaged, including but not limited to: ${get("confidential_info_description", "business plans, financial information, technical data, trade secrets")}.</p>

<p><strong>3. OBLIGATIONS:</strong> The Receiving Party agrees to: (a) hold the Confidential Information in strict confidence; (b) not disclose, publish, or disseminate the Confidential Information to any third party without prior written consent; (c) use the Confidential Information solely for the Purpose stated above; (d) protect the Confidential Information using at least the same degree of care as it uses to protect its own confidential information.</p>

<p><strong>4. TERM:</strong> This Agreement shall remain in effect for a period of <strong>${get("confidentiality_duration", "2")} ${get("confidentiality_duration") === "perpetual" ? "" : "year(s)"}</strong> from the date of this Agreement.</p>

<p><strong>5. GOVERNING LAW:</strong> This Agreement shall be governed by the laws of <strong>${get("governing_law", "India")}</strong> and the courts of ${get("governing_law", "India")} shall have exclusive jurisdiction.</p>

<div style="display:flex;justify-content:space-between;margin-top:48px;gap:40px;">
  <div style="flex:1;text-align:center;">
    <div style="border-top:1px solid #333;margin-top:50px;padding-top:8px;">
      <p style="font-size:12px;"><strong>${get("disclosing_party_name")}</strong></p>
      <p style="font-size:11px;color:#555;">Disclosing Party</p>
    </div>
  </div>
  <div style="flex:1;text-align:center;">
    <div style="border-top:1px solid #333;margin-top:50px;padding-top:8px;">
      <p style="font-size:12px;"><strong>${get("receiving_party_name")}</strong></p>
      <p style="font-size:11px;color:#555;">Receiving Party</p>
    </div>
  </div>
</div>

</div>`;

    case "offer-letter":
      return `
<div class="doc-preview" style="font-family:'Times New Roman',serif;font-size:13px;line-height:2;color:#111;max-width:700px;margin:0 auto;padding:24px;">

<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;border-bottom:2px solid #1e40af;padding-bottom:16px;">
  <div>
    <h1 style="font-size:20px;font-weight:bold;color:#1e40af;margin-bottom:4px;">${get("company_name", "Company Name")}</h1>
    <p style="font-size:11px;color:#555;white-space:pre-line;">${get("company_address")}</p>
    ${get("company_cin") ? `<p style="font-size:10px;color:#888;">CIN: ${get("company_cin")}</p>` : ""}
  </div>
  <div style="text-align:right;">
    <p style="font-size:11px;color:#555;">Date: <strong>${today}</strong></p>
    <p style="font-size:11px;color:#555;">Ref: OL/${new Date().getFullYear()}/${Math.floor(Math.random() * 9000) + 1000}</p>
  </div>
</div>

<p><strong>To,</strong></p>
<p><strong>${get("candidate_name")}</strong></p>
<p style="white-space:pre-line;">${get("candidate_address")}</p>

<div style="margin:20px 0;">
  <h2 style="font-size:15px;text-decoration:underline;font-weight:bold;">OFFER OF EMPLOYMENT</h2>
</div>

<p>Dear <strong>${get("candidate_name")}</strong>,</p>

<p>We are pleased to offer you the position of <strong>${get("job_designation")}</strong> in the <strong>${get("department")}</strong> department at <strong>${get("company_name")}</strong>, based at <strong>${get("work_location")}</strong>.</p>

<p>Your appointment is on a <strong>${get("employment_type", "full-time")}</strong> basis, subject to the terms and conditions set out below:</p>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:12px;">
  <tr style="background:#f0f4ff;">
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;width:40%;">Designation</td>
    <td style="padding:8px 12px;border:1px solid #ddd;">${get("job_designation")}</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Department</td>
    <td style="padding:8px 12px;border:1px solid #ddd;">${get("department")}</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Date of Joining</td>
    <td style="padding:8px 12px;border:1px solid #ddd;">${get("joining_date")}</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Work Location</td>
    <td style="padding:8px 12px;border:1px solid #ddd;">${get("work_location")}</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Annual CTC</td>
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">₹${get("annual_ctc")} per annum</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Monthly Gross Salary</td>
    <td style="padding:8px 12px;border:1px solid #ddd;">₹${get("monthly_gross")} per month</td>
  </tr>
  <tr style="background:#f0f4ff;">
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">Probation Period</td>
    <td style="padding:8px 12px;border:1px solid #ddd;">${get("probation_period") !== "none" ? get("probation_period") + " months" : "No probation period"}</td>
  </tr>
</table>

<p>This offer is valid until <strong>${get("offer_validity")}</strong>. Kindly confirm your acceptance by signing and returning a copy of this letter.</p>

<p>We look forward to welcoming you to the ${get("company_name")} family. Should you have any queries, please feel free to reach out to our HR team.</p>

<p>Yours sincerely,</p>

<div style="margin-top:50px;">
  <div style="border-top:1px solid #333;display:inline-block;min-width:220px;text-align:center;padding-top:8px;">
    <p style="font-size:12px;"><strong>${get("hr_name")}</strong></p>
    <p style="font-size:11px;color:#555;">${get("hr_designation")}</p>
    <p style="font-size:11px;color:#555;font-weight:bold;">${get("company_name")}</p>
  </div>
</div>

<div style="margin-top:48px;border-top:1px solid #ddd;padding-top:20px;">
  <p style="font-weight:bold;font-size:12px;">ACCEPTANCE OF OFFER:</p>
  <p style="font-size:12px;">I, <strong>${get("candidate_name")}</strong>, accept the above offer of employment on the terms and conditions mentioned herein.</p>
  <div style="display:flex;justify-content:space-between;margin-top:40px;gap:40px;">
    <div style="text-align:center;">
      <div style="border-top:1px solid #333;margin-top:40px;padding-top:8px;min-width:180px;">
        <p style="font-size:11px;color:#555;">Candidate Signature</p>
        <p style="font-size:11px;color:#555;">Date: _______________</p>
      </div>
    </div>
  </div>
</div>

</div>`;

    default:
      return `
<div class="doc-preview" style="font-family:'Times New Roman',serif;font-size:13px;line-height:2;color:#111;max-width:700px;margin:0 auto;padding:24px;">
  <div style="text-align:center;margin-bottom:28px;">
    <h1 style="font-size:20px;font-weight:bold;text-transform:uppercase;">${formData.templateName || "Document"}</h1>
    <p style="color:#555;">Date: ${today}</p>
  </div>
  <p>Your document has been generated with the provided information.</p>
  ${Object.entries(formData)
    .map(([k, v]) => `<p><strong>${k.replace(/_/g, " ")}:</strong> ${v}</p>`)
    .join("")}
</div>`;
  }
}

// ─── Main Preview Page ─────────────────────────────────────────
export default function PreviewPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const doc = getDocumentBySlug(slug);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`docsetu-doc-${slug}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData || {});
    }
    setLoading(false);
  }, [slug]);

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="text-slate-500">Document not found.</p>
      </div>
    );
  }

  const category = getCategoryBySlug(doc.categoryId);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("printable-document");
    if (!element) {
      alert("Document preview not ready.");
      return;
    }
    setDownloading(true);
    try {
      const html2canvasModule = await import("html2canvas");
      const html2canvas = html2canvasModule.default;
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.default;

      const canvas = await html2canvas(element, {
        scale: 2, // High resolution crisp text
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${doc.slug}-docsetu.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("PDF download failed. Please try printing instead.");
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadDocx = async () => {
    setDownloadingDocx(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } = await import("docx");
      const { saveAs } = await import("file-saver");

      const children: any[] = [
        new Paragraph({
          text: doc.name.toUpperCase(),
          heading: HeadingLevel.HEADING_1,
          alignment: "center" as any,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Generated by DocSetu on ${formatDate(new Date())}`,
              color: "888888",
              size: 18,
            }),
          ],
          alignment: "center" as any,
        }),
        new Paragraph({ text: "" }),
      ];

      for (const step of doc.steps) {
        children.push(
          new Paragraph({
            text: step.title,
            heading: HeadingLevel.HEADING_2,
          })
        );
        for (const field of step.fields) {
          const val = formData[field.id];
          if (!val) continue;
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${field.label}: `, bold: true }),
                new TextRun({ text: val }),
              ],
            })
          );
        }
        children.push(new Paragraph({ text: "" }));
      }

      // Disclaimer
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Generated by DocSetu (docsetu.in) — Expert-reviewed templates. Not legal advice. Consult a qualified professional for complex matters.",
              italics: true,
              color: "888888",
              size: 16,
            }),
          ],
        })
      );

      const docFile = new Document({
        sections: [{ properties: {}, children }],
      });

      const blob = await Packer.toBlob(docFile);
      saveAs(blob, `${doc.slug}-docsetu.docx`);
    } catch (err) {
      console.error("DOCX generation error:", err);
      alert("DOCX download failed. Please try again.");
    } finally {
      setDownloadingDocx(false);
    }
  };

  const documentHTML = loading ? "" : renderDocumentContent(doc.id, formData);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pt-16">
      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/documents/${doc.slug}/generate`}
              className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex-shrink-0"
            >
              <ArrowLeft size={15} /> Edit
            </Link>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {doc.name}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle size={10} /> Document ready for download
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Printer size={15} /> Print
            </button>

            <button
              onClick={handleDownloadDocx}
              disabled={downloadingDocx}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-60"
            >
              {downloadingDocx ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
              <span className="hidden sm:block">Download DOCX</span>
              <span className="sm:hidden">DOCX</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-70"
            >
              {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              {downloading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Document preview */}
          <div className="lg:col-span-3">
            <div id="printable-document" className="bg-white shadow-lg rounded-2xl overflow-hidden">
              {/* DocSetu branded header on document */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg">
                    Doc<span className="text-blue-200">Setu</span>
                  </p>
                  <p className="text-blue-200 text-xs">Making Official Documents Easy</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs">Generated: {formatDate(new Date())}</p>
                  <p className="text-blue-100 text-xs">ID: DS{Date.now().toString().slice(-6)}</p>
                </div>
              </div>

              {/* Document content */}
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="animate-spin text-blue-500" size={32} />
                </div>
              ) : (
                <div
                  ref={printRef}
                  className="px-8 py-10"
                  dangerouslySetInnerHTML={{ __html: documentHTML }}
                />
              )}

              {/* Watermark footer */}
              <div className="bg-slate-50 border-t border-slate-200 px-8 py-4 text-center">
                <p className="text-xs text-slate-400">
                  Generated by DocSetu (docsetu.in) — Based on expert-reviewed templates.
                  This document is not legal advice. Consult a qualified professional for complex matters.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Submission guidance */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">
                📋 Before You Submit
              </h3>

              {doc.stampRequired && (
                <div className="space-y-2.5 mb-2.5">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
                    <Stamp size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                        Stamp Paper / e-Stamp Required
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
                        Buy non-judicial e-Stamp paper online or from stamp vendor
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 space-y-2">
                    <p className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                      🌐 100% Online e-Stamping Portal
                    </p>
                    <a
                      href="https://www.shcilestamp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                    >
                      <span>Buy e-Stamp Online</span>
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href="https://www.shcilestamp.com/estamp_verify.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}

              {doc.witnessRequired && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 mb-2.5">
                  <Users size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                      2 Witnesses Required
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">
                      Must sign in presence of both parties
                    </p>
                  </div>
                </div>
              )}

              {doc.notaryRecommended && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 mb-2.5">
                  <Shield size={14} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-purple-700 dark:text-purple-400">
                      Notarization Recommended
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-500 mt-0.5">
                      Get attested by Notary Public
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-3 space-y-1.5">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Steps to complete:
                </p>
                {doc.submissionGuidance.generalSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Save to dashboard */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2 text-sm">💾 Save to Dashboard</h3>
              <p className="text-xs text-blue-100 mb-4">
                Save this document to your dashboard to re-download or edit later.
              </p>
              <Link
                href="/register"
                className="block text-center px-4 py-2.5 bg-white text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors"
              >
                Sign up Free →
              </Link>
            </div>

            {/* Important note */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2">
                <AlertTriangle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This document is based on standard templates. For complex situations or high-value
                  transactions, always consult a qualified legal professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
