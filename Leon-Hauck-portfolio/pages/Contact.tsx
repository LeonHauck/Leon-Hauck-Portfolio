
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/leonhauck98@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Novo contato de: ${formData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      alert("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente pelo email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('leonhauck98@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 pt-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4 leading-none">Vamos conversar.</h1>
        <p className="text-slate-500 dark:text-text-secondary text-base font-light leading-relaxed">
          Tem um projeto em mente ou quer apenas trocar uma ideia sobre tecnologia? Preencha o formulário ou me encontre nas redes.
        </p>
      </header>

      {isSuccess ? (
        <div className="mb-12 p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center animate-fade-in">
          <span className="material-symbols-outlined text-green-500 text-4xl mb-2">check_circle</span>
          <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-1">Mensagem Enviada!</h3>
          <p className="text-green-600 dark:text-green-400 text-sm">Obrigado pelo contato. Responderei em breve.</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-4 text-sm font-medium text-green-700 dark:text-green-300 hover:underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form className="space-y-6 mb-12" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block text-slate-500 dark:text-text-secondary text-[10px] font-bold uppercase tracking-widest mb-2" htmlFor="name">Nome</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </span>
              <input
                required
                className="block w-full rounded bg-slate-50 dark:bg-surface-dark border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary pl-10 pr-4 py-3 sm:text-sm transition-all"
                id="name"
                placeholder="Como devo te chamar?"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-slate-500 dark:text-text-secondary text-[10px] font-bold uppercase tracking-widest mb-2" htmlFor="email">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </span>
              <input
                required
                className="block w-full rounded bg-slate-50 dark:bg-surface-dark border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary pl-10 pr-4 py-3 sm:text-sm transition-all"
                id="email"
                placeholder="seu@email.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-slate-500 dark:text-text-secondary text-[10px] font-bold uppercase tracking-widest mb-2" htmlFor="message">Mensagem</label>
            <textarea
              required
              className="block w-full rounded bg-slate-50 dark:bg-surface-dark border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary p-4 sm:text-sm transition-all resize-none"
              id="message"
              placeholder="Conte-me sobre seu projeto..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Enviar Mensagem</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">send</span>
              </>
            )}
          </button>
        </form>
      )}

      <div className="border-t border-black/5 dark:border-zinc-800 pt-8 mb-8">
        <p className="text-slate-400 dark:text-text-secondary text-[10px] uppercase tracking-widest text-center mb-6">Ou conecte-se via</p>
        <div className="grid grid-cols-2 gap-3">
          <a href="https://github.com/leonhauck" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded bg-slate-50 dark:bg-surface-dark border border-transparent hover:border-primary/20 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all group">
            <span className="material-symbols-outlined text-2xl mb-2 group-hover:scale-110 transition-transform">code</span>
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/leon-hauck/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded bg-slate-50 dark:bg-surface-dark border border-transparent hover:border-primary/20 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all group">
            <span className="material-symbols-outlined text-2xl mb-2 group-hover:scale-110 transition-transform">work</span>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <button
            onClick={handleCopyEmail}
            className="col-span-2 flex items-center justify-between px-6 py-4 rounded bg-slate-50 dark:bg-surface-dark border border-transparent hover:border-primary/20 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all group w-full"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">mail</span>
              <div className="text-left">
                <span className="block text-sm font-medium">{isCopied ? 'Copiado!' : 'Copiar Email'}</span>
                <span className="block text-[10px] text-slate-500 dark:text-text-secondary">leonhauck98@gmail.com</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-xl">content_copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
