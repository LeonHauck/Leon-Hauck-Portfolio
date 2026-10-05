
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../components/LanguageContext';

// Current time where I am, so someone in another timezone knows when to expect a reply
const useLocalTime = (language: string) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  return new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'shortOffset',
  }).format(now);
};

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const localTime = useLocalTime(language);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      const response = await fetch("https://formsubmit.co/ajax/leonhauck98@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: language === 'pt' ? `Novo contato de: ${formData.name}` : `New contact from: ${formData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });

      // fetch only rejects on network failure; a 4xx/5xx from the service must not count as sent
      if (!response.ok) throw new Error(`FormSubmit respondeu ${response.status}`);

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('leonhauck98@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const labelClass = 'mono-label block mb-2';

  return (
    // Phone: one column (text, form, links). Tablet and up: text and links on the left, form on the right,
    // and the whole block centred in the height left under the top bar (4rem) and above the page padding (4rem)
    <div className="grid gap-10 w-full max-w-xl md:max-w-6xl mx-auto px-6 pt-8 md:py-10 md:min-h-[calc(100dvh-8rem)] md:grid-cols-2 md:content-center md:gap-x-10 md:gap-y-8 lg:gap-x-20">
      <header className="md:col-start-1 md:row-start-1 md:self-end">
        <p className="mono-label mb-3">{t('nav.contact')}</p>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-4 xl:mb-6 leading-none">{t('contact.title')}</h1>
        <p className="text-text-secondary text-base lg:text-lg font-light leading-relaxed max-w-lg">
          {t('contact.subtitle')}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-6 font-mono text-xs text-text-secondary">
          <li className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary-light">location_on</span>
            Juiz de Fora, Brasil
          </li>
          <li className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary-light">schedule</span>
            {localTime} · {t('contact.localTime')}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary-light">translate</span>
            {t('home.skills.languages')}
          </li>
        </ul>
      </header>

      <div className="md:col-start-2 md:row-start-1 md:row-span-2">
        {isSuccess ? (
          <div role="status" className="panel border-primary/40 p-8 text-center animate-fade-in h-full flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-matrix text-4xl mb-2">check_circle</span>
            <h3 className="text-lg font-bold text-white mb-1">{t('contact.form.successTitle')}</h3>
            <p className="text-text-secondary text-sm">{t('contact.form.successMessage')}</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 text-sm font-medium text-primary-light hover:underline"
            >
              {t('contact.form.sendAnother')}
            </button>
          </div>
        ) : (
          <form className="panel p-6 lg:p-8 flex flex-col gap-6 h-full" onSubmit={handleSubmit}>
            <div className="group">
              <label className={labelClass} htmlFor="name">{t('contact.form.name')}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary group-focus-within:text-primary-light transition-colors">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </span>
                <input
                  required
                  className="field pl-10 pr-4 py-3"
                  id="name"
                  autoComplete="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="group">
              <label className={labelClass} htmlFor="email">{t('contact.form.email')}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary group-focus-within:text-primary-light transition-colors">
                  <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                </span>
                <input
                  required
                  className="field pl-10 pr-4 py-3"
                  id="email"
                  autoComplete="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* The message field takes whatever height is left, which is what keeps the two columns level */}
            <div className="group flex flex-1 flex-col">
              <label className={labelClass} htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                required
                className="field p-4 resize-none flex-1"
                id="message"
                placeholder={t('contact.form.messagePlaceholder')}
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            {hasError && (
              <p role="alert" className="flex items-start gap-2 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {t('contact.form.error')}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('contact.form.send')}</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">send</span>
                  </>
                )}
              </button>
              <p className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-text-secondary">
                <span className="material-symbols-outlined text-[15px] text-primary-light">mark_email_read</span>
                {t('contact.form.responseTime')}
              </p>
            </div>
          </form>
        )}
      </div>

      <div className="border-t border-border-dark pt-8 md:border-0 md:pt-0 md:col-start-1 md:row-start-2 md:self-start">
        <p className="mono-label text-text-secondary text-center md:text-left mb-6 md:mb-4">{t('contact.connect')}</p>
        <div className="grid grid-cols-2 gap-3">
          <ContactLinks isCopied={isCopied} onCopy={handleCopyEmail} />
        </div>
      </div>
    </div>
  );
};

const ContactLinks: React.FC<{ isCopied: boolean; onCopy: () => void }> = ({ isCopied, onCopy }) => {
  const { t } = useLanguage();
  const cardClass = 'panel panel-hover flex items-center gap-3 min-w-0 px-4 py-3.5 lg:px-5 lg:py-4 group';
  const iconClass = 'material-symbols-outlined text-2xl text-primary-light group-hover:scale-110 transition-transform';

  const links = [
    { href: 'https://github.com/leonhauck', icon: 'code', label: 'GitHub', detail: 'LeonHauck' },
    { href: 'https://www.linkedin.com/in/leon-hauck/', icon: 'work', label: 'LinkedIn', detail: 'in/leon-hauck' },
    { href: '/assets/Leon Hauck - Perfil - Portugues.pdf', icon: 'download', label: t('contact.resume'), detail: 'PT-BR', download: 'Leon Hauck - Perfil - Portugues.pdf' },
    { href: '/assets/Leon Hauck - Profile - English.pdf', icon: 'download', label: t('contact.resume'), detail: 'EN-US', download: 'Leon Hauck - Profile - English.pdf' },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          download={link.download}
          className={cardClass}
        >
          <span className={iconClass}>{link.icon}</span>
          <span className="min-w-0 text-left">
            <span className="block text-sm font-medium truncate">{link.label}</span>
            <span className="block text-[11px] text-text-secondary font-mono truncate">{link.detail}</span>
          </span>
        </a>
      ))}
      <button
        onClick={onCopy}
        className={`${cardClass} col-span-2 justify-between w-full`}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className={iconClass}>mail</span>
          <span className="min-w-0 text-left">
            <span className="block text-sm font-medium">{isCopied ? t('contact.copied') : t('contact.copyEmail')}</span>
            <span className="block text-[11px] text-text-secondary font-mono truncate">leonhauck98@gmail.com</span>
          </span>
        </span>
        <span className="material-symbols-outlined text-text-secondary group-hover:text-matrix transition-colors text-xl">
          {isCopied ? 'check' : 'content_copy'}
        </span>
      </button>
    </>
  );
};

export default Contact;
