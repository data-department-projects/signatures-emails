"use client";

import React, { forwardRef } from "react";
import { SignatureData } from "./SignatureForm";
import {
  logoBase64,
  filigraneBase64,
  phoneIconBase64,
  locationIconBase64,
  webIconBase64,
} from "./imageBase64";

interface SignaturePreviewProps {
  data: SignatureData;
}

const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(
  ({ data }, ref) => {
    const primaryBlue = "#102a78";
    const white = "#ffffff";
    const dividerWhite = "#b3c0df";
    const fontStack = "'Montserrat','Trebuchet MS',Arial,Helvetica,sans-serif";
    const logoSrc = logoBase64;
    const filigraneSrc = filigraneBase64;
    const phoneIconSrc = phoneIconBase64;
    const locationIconSrc = locationIconBase64;
    const webIconSrc = webIconBase64;

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
    <td width="381" valign="top" style="width:381px;vertical-align:top;padding:22px 12px 10px 28px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td colspan="2" style="padding:0 0 4px 0;font-family:${fontStack};font-size:22px;font-weight:700;color:${white};line-height:1;letter-spacing:0.1px;">
            ${displayName}
          </td>
        </tr>
        <tr>
          <td width="150" valign="middle" style="width:150px;vertical-align:middle;padding:0 15px 0 0;font-family:${fontStack};font-size:11px;font-weight:500;color:${white};line-height:1.25;">
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

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;margin-top:20px;">
        <tr>
          <td width="120" style="width:120px;font-size:0;line-height:0;">&nbsp;</td>
          <td valign="top" style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td width="18" valign="middle" style="width:18px;vertical-align:middle;padding:0 6px 4px 0;">
                  <img src="${phoneIconSrc}" alt="" width="12" height="12" style="width:12px;height:12px;display:block;border:0;outline:none;" />
                </td>
                <td valign="middle" style="vertical-align:middle;padding-bottom:2px;font-family:${fontStack};font-size:9.5px;font-weight:500;color:${white};line-height:1.15;">
                  <a href="tel:${displayPhone}" style="color:${white};text-decoration:none;font-family:${fontStack};font-size:9.5px;font-weight:500;">${displayPhone}</a>
                </td>
              </tr>
              <tr>
                <td width="18" valign="top" style="width:18px;vertical-align:top;padding:1px 6px 4px 0;">
                  <img src="${locationIconSrc}" alt="" width="12" height="12" style="width:12px;height:12px;display:block;border:0;outline:none;" />
                </td>
                <td valign="top" style="vertical-align:top;padding-bottom:2px;font-family:${fontStack};font-size:9.5px;font-weight:500;color:${white};line-height:1.15;white-space:nowrap;">
                  Rue Katanga, quartier Baguida.<br/>12 BP 23 ; Lom&eacute; - Togo
                </td>
              </tr>
              <tr>
                <td width="18" valign="middle" style="width:18px;vertical-align:middle;padding:0 6px 0 0;">
                  <img src="${webIconSrc}" alt="" width="12" height="12" style="width:12px;height:12px;display:block;border:0;outline:none;" />
                </td>
                <td valign="middle" style="vertical-align:middle;padding-bottom:0;font-family:${fontStack};font-size:9.5px;font-weight:500;color:${white};line-height:1.15;">
                  <a href="https://${displayWebsite}" style="color:${white};text-decoration:none;font-family:${fontStack};font-size:9.5px;font-weight:500;">${displayWebsite}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
    <td width="160" valign="top" align="right" style="width:160px;vertical-align:top;text-align:right;padding:0;font-size:0;line-height:0;">
      <img src="${filigraneSrc}" alt="" width="160" height="156" style="display:block;width:160px;height:156px;border:0;outline:none;" />
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
