$publicDir = "d:\Projects\facam\signatures-emails\public"
$outputFile = "d:\Projects\facam\signatures-emails\src\components\imageBase64.ts"

$logo = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$publicDir\logo-blanc.png"))
$filigrane = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$publicDir\filigrane-150x156.png"))
$phone = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$publicDir\telephone-icone.png"))
$location = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$publicDir\localisation-icone.png"))
$web = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$publicDir\site-web-icone.png"))

$content = @"
// Auto-generated base64 image data for email signature
// These are used as inline data URIs so images display correctly in email clients

export const logoBase64 = "data:image/png;base64,$logo";

export const filigraneBase64 = "data:image/png;base64,$filigrane";

export const phoneIconBase64 = "data:image/png;base64,$phone";

export const locationIconBase64 = "data:image/png;base64,$location";

export const webIconBase64 = "data:image/png;base64,$web";
"@

[IO.File]::WriteAllText($outputFile, $content)
Write-Host "Generated $outputFile"
