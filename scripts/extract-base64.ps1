$files = @(
    @{ input = "telephone-icone-b64-temp.txt"; output = "telephone-icone-base64.txt" },
    @{ input = "localisation-icone-b64-temp.txt"; output = "localisation-icone-base64.txt" },
    @{ input = "site-web-icone-b64-temp.txt"; output = "site-web-icone-base64.txt" }
)

foreach ($f in $files) {
    $inputPath = Join-Path "d:\Projects\facam\signatures-emails\public" $f.input
    $outputPath = Join-Path "d:\Projects\facam\signatures-emails\public" $f.output
    $lines = Get-Content $inputPath | Where-Object { $_ -notmatch "CERTIFICATE" -and $_ -ne "" }
    $b64 = ($lines -join "").Trim()
    [IO.File]::WriteAllText($outputPath, $b64)
    Write-Host "Created $outputPath"
}
