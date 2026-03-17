'use client'

import React, { useState, useRef } from 'react'
import SignatureForm, { SignatureData } from '@/components/SignatureForm'
import SignaturePreview from '@/components/SignaturePreview'

export default function Home() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: '',
    position: '',
    phone: '',
    email: '',
  })

  const [copied, setCopied] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const copySignatureToClipboard = async () => {
    if (!previewRef.current) return

    try {
      const htmlContent = previewRef.current.innerHTML
      const blobHtml = new Blob([htmlContent], { type: 'text/html' })
      const blobText = new Blob([previewRef.current.innerText], { type: 'text/plain' })

      const data = [
        new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        }),
      ]

      await navigator.clipboard.write(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy signature: ', err)
      // Fallback
      const range = document.createRange()
      range.selectNodeContents(previewRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      document.execCommand('copy')
      selection?.removeAllRanges()
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const isFormComplete =
    signatureData.name.trim() !== '' &&
    signatureData.position.trim() !== '' &&
    signatureData.phone.trim() !== '' &&
    signatureData.email.trim() !== ''

  return (
    <main className="main-container">
      {/* Decorative background shapes */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>

      <header className="header">
        <div className="header-badge">OUTIL INTERNE</div>
        <h1>
          <span className="header-icon">✉</span>
          Générateur de Signature Email
        </h1>
        <p>
          Créez votre signature email professionnelle aux couleurs de{' '}
          <strong>FACAM STAIRWAY - TOGO</strong> en quelques secondes.
        </p>
      </header>

      <div className="content-wrapper">
        <section className="left-panel">
          <SignatureForm data={signatureData} onChange={setSignatureData} />

          {/* Creative addition: Instructions / Tips */}
          <div className="tips-card">
            <h3>💡 Comment l&apos;utiliser ?</h3>
            <ol>
              <li>Remplissez vos informations ci-dessus</li>
              <li>Vérifiez l&apos;aperçu à droite</li>
              <li>Cliquez <strong>« Copier la signature »</strong></li>
              <li>
                Collez dans <strong>Outlook</strong> → Fichier → Options → Courrier → Signatures
              </li>
            </ol>
          </div>
        </section>

        <section className="right-panel">
          <div className="preview-header">
            <h2>Aperçu de la signature</h2>
            <button
              className={`btn-copy ${copied ? 'btn-copied' : ''} ${!isFormComplete ? 'btn-disabled' : ''}`}
              onClick={copySignatureToClipboard}
              disabled={!isFormComplete}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Copié avec succès !
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copier la signature
                </>
              )}
            </button>
          </div>
          <div className="preview-container">
            <SignaturePreview ref={previewRef} data={signatureData} />
          </div>

          {/* Creative addition: Indicator for completeness */}
          {!isFormComplete && (
            <div className="completion-hint">
              <span className="hint-icon">⚠</span>
              Remplissez tous les champs pour activer la copie
            </div>
          )}
        </section>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} FACAM STAIRWAY - TOGO · Outil interne de génération de signatures</p>
      </footer>
    </main>
  )
}
