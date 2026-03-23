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
    const [phoneIconBase64, setPhoneIconBase64] = useState<string>("");
    const [locationIconBase64, setLocationIconBase64] = useState<string>("");
    const [webIconBase64, setWebIconBase64] = useState<string>("");

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

      const loadSvgAsBase64Png = (svgPath: string, width: number, height: number): Promise<string> =>
        fetch(svgPath)
          .then((res) => res.text())
          .then((svgText) => {
            return new Promise<string>((resolve) => {
              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              const img = new Image();
              const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              img.onload = () => {
                ctx?.drawImage(img, 0, 0, width, height);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL("image/png"));
              };
              img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(svgPath);
              };
              img.src = url;
            });
          })
          .catch(() => svgPath);

      Promise.all([
        loadBase64Asset("/logo-blanc-base64.txt", "/logo-blanc.png"),
        loadSvgAsBase64Png("/filigrane.svg", 760, 156),
        loadSvgAsBase64Png("/telephone-icone.svg", 40, 40),
        loadSvgAsBase64Png("/localisation-icone.svg", 40, 40),
        loadSvgAsBase64Png("/site-web-icone.svg", 40, 40),
      ]).then(([logo, filigrane, phoneIcon, locationIcon, webIcon]) => {
        setLogoBase64(logo);
        setFiligraneBase64(filigrane);
        setPhoneIconBase64(phoneIcon);
        setLocationIconBase64(locationIcon);
        setWebIconBase64(webIcon);
      });
    }, []);

    const logoSrc = logoBase64 || "/logo-blanc.png";
    const filigraneSrc = filigraneBase64 || "/filigrane.svg";
    const phoneIconSrc = phoneIconBase64 || "/telephone-icone.svg";
    const locationIconSrc = locationIconBase64 || "/localisation-icone.svg";
    const webIconSrc = webIconBase64 || "/site-web-icone.svg";
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
<table cellpadding="0" cellspacing="0" border="0" width="760" style="width:760px;max-width:760px;font-family:${fontStack};mso-font-alt:Arial;border-collapse:collapse;table-layout:fixed;background-color:${primaryBlue};background-image:url('${filigraneSrc}');background-repeat:no-repeat;background-position:center;background-size:100% 100%;">
  <tr>
    <td width="218" valign="middle" align="center" style="width:218px;vertical-align:middle;text-align:center;padding:10px 16px 10px 20px;">
      <img src="${logoSrc}" alt="FACAM STAIRWAY - TOGO" width="188" style="width:188px;height:auto;display:block;margin:0 auto;border:0;outline:none;" />
    </td>
    <td width="1" valign="middle" style="width:1px;vertical-align:middle;padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" width="1" style="width:1px;border-collapse:collapse;">
        <tr>
          <td height="110" bgcolor="${dividerWhite}" style="height:110px;width:1px;font-size:0;line-height:0;background-color:${dividerWhite};">&nbsp;</td>
        </tr>
      </table>
    </td>
    <td width="541" valign="top" style="width:541px;vertical-align:top;padding:16px 12px 10px 28px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td colspan="2" style="padding:0 0 4px 0;font-family:${fontStack};font-size:26px;font-weight:700;color:${white};line-height:1;letter-spacing:0.1px;">
            ${displayName}
          </td>
        </tr>
        <tr>
          <td width="150" valign="middle" style="width:150px;vertical-align:middle;padding:0 15px 0 0;font-family:${fontStack};font-size:12px;font-weight:500;color:${white};line-height:1.25;">
            ${displayPosition}
          </td>
          <td valign="middle" style="vertical-align:middle;padding-top:5px;">
            <table cellpadding="0" cellspacing="0" border="0" width="220" style="width:220px;border-collapse:collapse;">
              <tr>
                <td height="1" bgcolor="${dividerWhite}" style="height:1px;font-size:0;line-height:0;background-color:${dividerWhite};">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;margin-top:22px;">
        <tr>
          <td width="120" style="width:120px;font-size:0;line-height:0;">&nbsp;</td>
          <td valign="top" style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td width="18" valign="middle" style="width:18px;vertical-align:middle;padding:0 6px 4px 0;">
                  <img src="${phoneIconSrc}" alt="" width="14" height="14" style="width:14px;height:14px;display:block;border:0;outline:none;" />
                </td>
                <td valign="middle" style="vertical-align:middle;padding-bottom:4px;font-family:${fontStack};font-size:10.5px;font-weight:500;color:${white};line-height:1.15;">
                  <a href="tel:${displayPhone}" style="color:${white};text-decoration:none;font-family:${fontStack};font-size:10.5px;font-weight:500;">${displayPhone}</a>
                </td>
              </tr>
              <tr>
                <td width="18" valign="top" style="width:18px;vertical-align:top;padding:1px 6px 4px 0;">
                  <img src="${locationIconSrc}" alt="" width="14" height="14" style="width:14px;height:14px;display:block;border:0;outline:none;" />
                </td>
                <td valign="top" style="vertical-align:top;padding-bottom:4px;font-family:${fontStack};font-size:10.5px;font-weight:500;color:${white};line-height:1.15;white-space:nowrap;">
                  Rue Katanga, quartier Baguida.<br/>12 BP 23 ; Lom&eacute; - Togo
                </td>
              </tr>
              <tr>
                <td width="18" valign="middle" style="width:18px;vertical-align:middle;padding:0 6px 0 0;">
                  <img src="${webIconSrc}" alt="" width="14" height="14" style="width:14px;height:14px;display:block;border:0;outline:none;" />
                </td>
                <td valign="middle" style="vertical-align:middle;padding-bottom:0;font-family:${fontStack};font-size:10.5px;font-weight:500;color:${white};line-height:1.15;">
                  <a href="https://${displayWebsite}" style="color:${white};text-decoration:none;font-family:${fontStack};font-size:10.5px;font-weight:500;">${displayWebsite}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
