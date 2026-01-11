import React from 'react';

interface Certificate {
    id: number;
    title: string;
    institution: string;
    date: string;
    link: string;
    projectLink?: string;
    type: 'PDF' | 'IMAGE';
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Formação em Liderança',
        institution: 'Escola Conquer',
        date: '2022',
        link: '/assets/Certificado Formação em Liderança conquer.jpeg',
        type: 'IMAGE',
    },
    {
        id: 2,
        title: 'Excel Completo',
        institution: 'Udemy',
        date: '2023',
        link: '/assets/Cetificado Curso Excel Completo.jpg',
        type: 'IMAGE',
    },
    {
        id: 3,
        title: 'Análise de Dados e Power BI',
        institution: 'Escola Conquer',
        date: '2023',
        link: '/assets/Certificado Análise de Dados e Power BI Conquer.jpeg',
        type: 'IMAGE',
    },
    {
        id: 4,
        title: 'inteligência Emocional',
        institution: 'Escola Conquer Plus',
        date: '2023',
        link: '/assets/Certificado Inteligência Emociona 2.0 Conquer.jpeg',
        type: 'IMAGE',
    },
    {
        id: 5,
        title: 'Comunicação e Oratória',
        institution: 'Escola Conquer',
        date: '2023',
        link: '/assets/Certificado de Comunicação e Oratória - Conquer.jpeg',
        type: 'IMAGE',
    },
    {
        id: 6,
        title: 'Programação com Python',
        institution: 'Instituto AARON SWARTZ',
        date: '2023',
        link: '/assets/Certificado de Introdução Programação com Python - Aaron.pdf',
        type: 'PDF',
    },
    {
        id: 7,
        title: 'Formação Spark com Pyspark',
        institution: 'Udemy',
        date: '2024',
        link: '/assets/Certificado Formação Spark Com Pyspark.jpg',
        type: 'IMAGE',
    },
    {
        id: 8,
        title: 'Pacote Office',
        institution: 'Udemy',
        date: '2024',
        link: '/assets/Certificado Pacote Office Essencial.jpg',
        type: 'IMAGE',
    },
    {
        id: 9,
        title: 'Método Kanban',
        institution: 'FM2S - Educação e Consultoria',
        date: '2024',
        link: '/assets/Certificado -  Método Kanban FM2S.png',
        type: 'IMAGE',
    },
    {
        id: 10,
        title: 'Inteligeêcia Artificial',
        institution: 'Conquer Business School',
        date: '2024',
        link: '/assets/Certificado Inteligência Artificial.jpeg',
        type: 'IMAGE',
    },
    {
        id: 11,
        title: 'OKR - Objetivos e Resultados',
        institution: 'FM2S - Educação e Consultoria',
        date: '2025',
        link: '/assets/Certificado - OKR - Objectives and Key Results - FM2S.png',
        type: 'IMAGE',
    },

    {
        id: 12,
        title: 'Lean Six Sigma Black Belt',
        institution: 'FM2S - Educação e Consultoria',
        date: '2025',
        link: '/assets/Certificado -  Lean Six Sigma Black Belt - FM2S.png',
        projectLink: '/assets/Black-Belt-Projeto-Final- Leon Rodrigues Hauck.pdf', // Certifique-se de que o nome do arquivo está correto
        type: 'PDF',
    },
    {
        id: 13,
        title: 'Formação Completa em IA',
        institution: 'Udemy',
        date: '2025',
        link: '/assets/Certificado Formação Completa IA - 2025.jpg',
        type: 'IMAGE',
    },
    {
        id: 14,
        title: 'Formação Angular',
        institution: 'Udemy',
        date: '2025',
        link: '/assets/Certificado Formação em Angular.jpg',
        type: 'IMAGE',
    },
    {
        id: 15,
        title: 'Performance APIS',
        institution: 'Udemy',
        date: '2025',
        link: '/assets/Certificado Postman 2025 - Performance APIs.jpg',
        type: 'IMAGE',
    },
    {
        id: 16,
        title: 'SQL e Banco de Dados',
        institution: 'Udemy',
        date: '2025',
        link: '/assets/Certificado SQL e Banco de Dados.jpg',
        type: 'IMAGE',
    }, {
        id: 17,
        title: 'Educação Corporativa',
        institution: 'Conquer in Company',
        date: '2025',
        link: '/assets/Certificado T&D Educação Corporativa Conquer.jpeg',
        type: 'IMAGE',
    },
];

const Certifications: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-bold mb-2 text-primary dark:text-white">CERTIFICADOS</h1>
                <p className="text-slate-500 dark:text-text-secondary mb-12">
                    Minha jornada de aprendizado contínuo e aperfeiçoamento profissional.
                </p>

                <div className="grid gap-4">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="group relative bg-white/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-surface-dark/80 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm font-medium text-slate-500 dark:text-text-secondary">
                                            {cert.institution}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <span className="text-sm text-slate-400 dark:text-slate-500">
                                            {cert.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {cert.type === 'PDF' ? 'picture_as_pdf' : 'image'}
                                        </span>
                                        VER CERTIFICADO
                                    </a>

                                    {cert.projectLink && (
                                        <a
                                            href={cert.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all transform active:scale-95 shadow-lg shadow-black/20"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                description
                                            </span>
                                            VER PROJETO
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Certifications;
