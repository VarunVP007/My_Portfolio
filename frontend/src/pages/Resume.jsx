import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, FileText, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { scrollReveal } from '../animations/variants';

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState(false);

  const handlePrint = () => window.print();
  const resumeUrl = '/resume/VarunPrasad_Resume.pdf';

  return (
    <PageTransition>
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <SectionTitle title="Resume" />
          <div className="grid lg:grid-cols-3 gap-10">
            {/* PDF Viewer */}
            <div className="lg:col-span-2">
              <motion.div {...scrollReveal(0)} className="card overflow-hidden">
                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border bg-background">
                  <div className="flex items-center gap-2 text-sm font-medium text-text">
                    <FileText size={16} className="text-primary" />
                    VarunPrasad V_Resume.pdf
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      href={resumeUrl}
                      download="VarunPrasad_Resume.pdf"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      <Download size={15} /> Download
                    </motion.a>
                    <motion.button
                      onClick={handlePrint}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-outline text-sm px-4 py-2"
                    >
                      <Printer size={15} /> Print
                    </motion.button>
                  </div>
                </div>

                {/* PDF Embed */}
                <div className="p-6 bg-gray-50 min-h-[700px] flex items-center justify-center">
                  {pdfError ? (
                    <div className="text-center">
                      <div className="text-5xl mb-4">📄</div>
                      <h3 className="font-semibold text-text mb-2">PDF Preview</h3>
                      <p className="text-text-muted text-sm mb-6">
                        Add your resume PDF to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public/resume/VarunPrasad_Resume.pdf</code>
                      </p>
                      <a href={resumeUrl} download className="btn-primary text-sm">
                        <Download size={15} /> Download Resume
                      </a>
                    </div>
                  ) : (
                    <iframe
                      src={`${resumeUrl}#toolbar=0`}
                      title="Resume PDF"
                      className="w-full rounded-xl shadow-soft"
                      style={{ height: '700px', border: 'none' }}
                      onError={() => setPdfError(true)}
                    />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* ATS Info */}
              <motion.div
                {...scrollReveal(0.1)}
                className="card p-6 bg-gradient-to-br from-primary/3 to-secondary/3 border-primary/15"
              >
                <h3 className="font-display font-semibold text-text mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  ATS Optimized
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  This resume is designed to pass Applicant Tracking Systems (ATS) with clean formatting, relevant keywords, and proper structure.
                </p>
                <ul className="space-y-1.5">
                  {['Clean single-column layout', 'ATS-friendly fonts', 'Relevant keywords included', 'Quantified achievements', 'Standard section headings'].map((tip) => (
                    <li key={tip} className="flex items-center gap-2 text-xs text-text-muted">
                      <CheckCircle size={11} className="text-green-500 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Download CTA */}
              <motion.div {...scrollReveal(0.2)}>
                <a
                  href={resumeUrl}
                  download="VarunPrasad_Resume.pdf"
                  className="btn-accent w-full justify-center"
                >
                  <Download size={18} />
                  Download PDF Resume
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Resume;
