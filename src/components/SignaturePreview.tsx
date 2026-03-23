"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { SignatureData } from "./SignatureForm";

interface SignaturePreviewProps {
  data: SignatureData;
}

const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(
  ({ data }, ref) => {
    const primaryBlue = "#102a78";
    const white = "#ffffff";
    const dividerWhite = "#b3c0df";
    const fontStack = "'Montserrat','Trebuchet MS',Arial,Helvetica,sans-serif";
    const [logoBase64, setLogoBase64] = useState<string>("");
    const [filigraneBase64, setFiligraneBase64] = useState<string>("");

    useEffect(() => {
      const loadPngAsDataUri = (path: string) =>
        fetch(path)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              }),
          );

      const loadBase64Asset = async (
        textPath: string,
        fallbackPath: string,
      ) => {
        try {
          const response = await fetch(textPath);
          if (!response.ok) {
            throw new Error(`Unable to load ${textPath}`);
          }

          const base64 = (await response.text()).replace(/\s+/g, "");
          return `data:image/png;base64,${base64}`;
        } catch {
          return loadPngAsDataUri(fallbackPath).catch(() => fallbackPath);
        }
      };

      Promise.all([
        loadBase64Asset("/logo-blanc-base64.txt", "/logo-blanc.png"),
        loadBase64Asset("/filigrane-base64.txt", "/filigrane.png"),
      ]).then(([logo, filigrane]) => {
        setLogoBase64(logo);
        setFiligraneBase64(filigrane);
      });
    }, []);

    const logoSrc = logoBase64 || "/logo-blanc.png";
    const filigraneSrc = filigraneBase64 || "/filigrane.png";
    const displayName = data.name || "Nom Prenom";
    const displayPosition = data.position || "Poste occupe";
    const displayPhone = data.phone || "+228 XX XX XX XX";
    const displayWebsite = "www.facamstairwaytogo.com";

    const signatureHtml = `
<!--[if gte mso 9]>
<style>
table { border-collapse: collapse !important; }
td { mso-line-height-rule: exactly; }
</style>
<![endif]-->
<table cellpadding="0" cellspacing="0" border="0" width="760" style="width:760px;max-width:760px;font-family:${fontStack};mso-font-alt:Arial;border-collapse:collapse;table-layout:fixed;background-color:${primaryBlue};">
  <tr>
    <td width="218" valign="middle" align="center" bgcolor="${primaryBlue}" style="width:218px;vertical-align:middle;text-align:center;padding:14px 16px 14px 20px;background-color:${primaryBlue};">
      <img src="${logoSrc}" alt="FACAM STAIRWAY - TOGO" width="188" style="width:188px;height:auto;display:block;margin:0 auto;border:0;outline:none;" />
    </td>
    <td width="1" valign="middle" bgcolor="${primaryBlue}" style="width:1px;vertical-align:middle;background-color:${primaryBlue};padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" width="1" style="width:1px;border-collapse:collapse;">
        <tr>
          <td height="148" bgcolor="${dividerWhite}" style="height:125px;width:1px;font-size:0;line-height:0;background-color:${dividerWhite};">&nbsp;</td>
        </tr>
      </table>
    </td>
    <td width="381" valign="top" bgcolor="${primaryBlue}" style="width:381px;vertical-align:top;padding:24px 12px 12px 28px;background-color:${primaryBlue};">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td colspan="2" style="padding:0 0 6px 0;font-family:${fontStack};font-size:31px;font-weight:700;color:${white};line-height:1;letter-spacing:0.1px;">
            ${displayName}
          </td>
        </tr>
        <tr>
          <td width="150" valign="middle" style="width:150px;vertical-align:middle;padding:0 18px 0 0;font-family:${fontStack};font-size:14px;font-weight:500;color:${white};line-height:1.25;">
            ${displayPosition}
          </td>
          <td valign="middle" style="vertical-align:middle;padding-top:5px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
              <tr>
                <td height="1" bgcolor="${dividerWhite}" style="height:1px;font-size:0;line-height:0;background-color:${dividerWhite};">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;margin-top:34px;">
        <tr>
          <td width="178" style="width:178px;font-size:0;line-height:0;">&nbsp;</td>
          <td valign="top" style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td width="18" valign="top" style="width:18px;vertical-align:top;padding:0 8px 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${white};line-height:1;">&#9742;</td>
                <td valign="top" style="vertical-align:top;padding-bottom:6px;font-family:${fontStack};font-size:11.5px;font-weight:500;color:${white};line-height:1.15;">
                  <a href="tel:${displayPhone}" style="color:${white};text-decoration:none;font-family:${fontStack};font-size:11.5px;font-weight:500;">${displayPhone}</a>
                </td>
              </tr>
              <tr>
                <td width="18" valign="top" style="width:18px;vertical-align:top;padding:0 8px 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${white};line-height:1;">&#8982;</td>
                <td valign="top" style="vertical-align:top;padding-bottom:6px;font-family:${fontStack};font-size:11.5px;font-weight:500;color:${white};line-height:1.15;">
                  Rue Katanga, quartier Baguida.<br/>12 BP 23 ; Lom&eacute; - Togo
                </td>
              </tr>
              <tr>
                <td width="18" valign="top" style="width:18px;vertical-align:top;padding:0 8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;color:${white};line-height:1.25;">WWW</td>
                <td valign="top" style="vertical-align:top;padding-bottom:0;font-family:${fontStack};font-size:11.5px;font-weight:500;color:${white};line-height:1.15;">
                  <a href="https://${displayWebsite}" style="color:${white};text-decoration:none;font-family:${fontStack};font-size:11.5px;font-weight:500;">${displayWebsite}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
    <td width="160" valign="bottom" align="right" bgcolor="${primaryBlue}" style="width:160px;vertical-align:bottom;text-align:right;padding:0;background-color:${primaryBlue};">
      <!--[if gte mso 9]>
      <img src="${filigraneSrc}" alt="" width="160" style="width:160px;height:180px;display:block;border:0;outline:none;" />
      <![endif]-->
      <!--[if !mso]><!-->
      <table cellpadding="0" cellspacing="0" border="0" width="160" style="width:160px;border-collapse:collapse;background-image:url('${filigraneSrc}');background-repeat:no-repeat;background-position:right bottom;background-size:260px 156px;">
        <tr>
          <td height="156" style="height:156px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
      </table>
      <!--<![endif]-->
    </td>
  </tr>
</table>
`;

    return (
      <div
        ref={ref}
        className="signature-preview-container"
        dangerouslySetInnerHTML={{ __html: signatureHtml }}
      />
    );
  },
);

SignaturePreview.displayName = "SignaturePreview";

export default SignaturePreview;
