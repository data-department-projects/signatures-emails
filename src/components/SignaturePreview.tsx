'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { SignatureData } from './SignatureForm'

interface SignaturePreviewProps {
  data: SignatureData
}

const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(
  ({ data }, ref) => {
    const primaryBlue = '#001b61'
    const accentYellow = '#ffae03'
    const white = '#ffffff'
    const [logoBase64, setLogoBase64] = useState<string>('')
    const [motifBase64, setMotifBase64] = useState<string>('')
    const [filigraneBase64, setFiligraneBase64] = useState<string>('')

    useEffect(() => {
      const loadAsset = (path: string) =>
        fetch(path)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.readAsDataURL(blob)
              })
          )
          .catch(() => path)

      Promise.all([
        loadAsset('/logo.png'),
        loadAsset('/signature-mail-2026-2.0_motif.png'),
        loadAsset('/signature-mail-2026-2.0_filigrane.png'),
      ]).then(([logo, motif, filigrane]) => {
        setLogoBase64(logo)
        setMotifBase64(motif)
        setFiligraneBase64(filigrane)
      })
    }, [])

    const logoSrc = logoBase64 || '/logo.png'
    const motifSrc = motifBase64 || '/signature-mail-2026-2.0_motif.png'
    const filigraneSrc = filigraneBase64 || '/signature-mail-2026-2.0_filigrane.png'

    // Generate the signature using dangerouslySetInnerHTML for Outlook VML compatibility
    const signatureHtml = `
<!--[if gte mso 9]>
<style>
table { border-collapse: collapse !important; }
td { mso-line-height-rule: exactly; }
</style>
<![endif]-->
<table cellpadding="0" cellspacing="0" border="0" width="680" style="width:680px;max-width:680px;font-family:'Montserrat',Arial,Helvetica,sans-serif;border-collapse:collapse;background-color:${primaryBlue};">
  <tr>
    <!-- LOGO COLUMN -->
    <td width="165" valign="middle" align="center" bgcolor="${primaryBlue}" style="width:165px;vertical-align:middle;text-align:center;padding:18px 8px 18px 15px;">
      <img src="${logoSrc}" alt="FACAM STAIRWAY - TOGO" width="125" style="width:125px;height:auto;display:block;margin:0 auto;border:0;outline:none;" />
    </td>

    <!-- VERTICAL SEPARATOR -->
    <td width="1" bgcolor="${accentYellow}" style="width:1px;font-size:0;line-height:0;padding:0;" valign="middle">
      <table cellpadding="0" cellspacing="0" border="0" width="1" style="width:1px;border-collapse:collapse;">
        <tr>
          <td height="15" style="height:15px;font-size:0;line-height:0;background-color:${primaryBlue};">&nbsp;</td>
        </tr>
        <tr>
          <td height="100" bgcolor="${accentYellow}" style="height:100px;font-size:0;line-height:0;background-color:${accentYellow};">&nbsp;</td>
        </tr>
        <tr>
          <td height="15" style="height:15px;font-size:0;line-height:0;background-color:${primaryBlue};">&nbsp;</td>
        </tr>
      </table>
    </td>

    <!-- INFO COLUMN -->
    <td valign="top" bgcolor="${primaryBlue}" style="vertical-align:top;padding:16px 12px 16px 18px;">
      <!-- Name -->
      <p style="margin:0 0 1px 0;padding:0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:19px;font-weight:700;color:${white};line-height:1.25;letter-spacing:0.3px;">
        ${data.name || 'Nom Prénom'}
      </p>
      <!-- Position -->
      <p style="margin:0 0 7px 0;padding:0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:${accentYellow};line-height:1.3;font-style:italic;">
        ${data.position || 'Poste occupé'}
      </p>
      <!-- Horizontal line under position (table-based for Outlook) -->
      <table cellpadding="0" cellspacing="0" border="0" width="85%" style="width:85%;border-collapse:collapse;margin-bottom:8px;">
        <tr>
          <td height="1" bgcolor="${accentYellow}" style="height:1px;font-size:0;line-height:0;background-color:${accentYellow};">&nbsp;</td>
          <td width="40%" height="1" style="height:1px;font-size:0;line-height:0;background-color:transparent;">&nbsp;</td>
        </tr>
      </table>
      <!-- Contact info table -->
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <!-- Phone -->
        <tr>
          <td width="16" valign="top" style="width:16px;vertical-align:top;padding:1px 6px 3px 0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};">&#x2706;</td>
          <td valign="top" style="vertical-align:top;padding-bottom:3px;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};line-height:1.4;">
            <a href="tel:${data.phone}" style="color:${accentYellow};text-decoration:none;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;">${data.phone || '+228 XX XX XX XX'}</a>
          </td>
        </tr>
        <!-- Address -->
        <tr>
          <td width="16" valign="top" style="width:16px;vertical-align:top;padding:1px 6px 3px 0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};">&#x2295;</td>
          <td valign="top" style="vertical-align:top;padding-bottom:3px;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};line-height:1.4;">
            Rue Katanga, quartier Baguida.<br/>12 BP 23 ; Lom&eacute; - Togo
          </td>
        </tr>
        <!-- Email -->
        <tr>
          <td width="16" valign="top" style="width:16px;vertical-align:top;padding:1px 6px 3px 0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};">&#x2709;</td>
          <td valign="top" style="vertical-align:top;padding-bottom:3px;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};line-height:1.4;">
            <a href="mailto:${data.email}" style="color:${accentYellow};text-decoration:none;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;">${data.email || 'email@facamstairwaytogo.com'}</a>
          </td>
        </tr>
        <!-- Website -->
        <tr>
          <td width="16" valign="top" style="width:16px;vertical-align:top;padding:1px 6px 0 0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};">&#x2295;</td>
          <td valign="top" style="vertical-align:top;padding-bottom:0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;color:${accentYellow};line-height:1.4;">
            <a href="https://www.facamstairwaytogo.com" style="color:${accentYellow};text-decoration:none;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;">www.facamstairwaytogo.com</a>
          </td>
        </tr>
      </table>
    </td>

    <!-- MOTIF + TRIANGLE COLUMN -->
    <td width="90" valign="top" bgcolor="${primaryBlue}" style="width:90px;vertical-align:top;padding:0;background-color:${primaryBlue};">
      <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:90px;height:130px;">
        <v:fill type="tile" src="${motifSrc}" color="${primaryBlue}" />
        <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:false">
      <![endif]-->
      <table cellpadding="0" cellspacing="0" border="0" width="90" style="width:90px;border-collapse:collapse;background-image:url('${motifSrc}');background-size:cover;background-position:center;background-repeat:repeat;">
        <!-- Triangle row: using an image approach for Outlook compatibility -->
        <tr>
          <td width="90" height="70" align="right" valign="top" style="width:90px;height:70px;text-align:right;vertical-align:top;">
            <!--[if gte mso 9]>
            <v:shape xmlns:v="urn:schemas-microsoft-com:vml" coordsize="90,70" path="m90,0 l90,70,0,0 xe" style="width:90px;height:70px;" fillcolor="${accentYellow}" stroked="false">
              <v:fill color="${accentYellow}" />
            </v:shape>
            <![endif]-->
            <!--[if !mso]><!-->
            <div style="width:0;height:0;border-style:solid;border-width:0 90px 70px 0;border-color:transparent ${accentYellow} transparent transparent;float:right;"></div>
            <!--<![endif]-->
          </td>
        </tr>
        <tr>
          <td height="60" style="height:60px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
      </table>
      <!--[if gte mso 9]>
        </v:textbox>
      </v:rect>
      <![endif]-->
    </td>
  </tr>
</table>
`

    return (
      <div
        ref={ref}
        className="signature-preview-container"
        dangerouslySetInnerHTML={{ __html: signatureHtml }}
      />
    )
  }
)

SignaturePreview.displayName = 'SignaturePreview'

export default SignaturePreview
