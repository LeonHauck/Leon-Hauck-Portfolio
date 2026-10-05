import { CertificateEntry } from '../types';

// COMO ADICIONAR UM CERTIFICADO
// 1. Coloque o arquivo (imagem ou PDF) em public/assets/
// 2. Copie o primeiro bloco { ... } abaixo, cole no TOPO da lista e troque os dados
//
// - Cadastre uma vez só: textos com { pt: '...', en: '...' } aparecem no idioma certo.
//   Se o texto for igual nos dois idiomas, pode escrever direto: institution: 'Udemy'
// - year: o ano do certificado. Um ano novo (ex.: 2027) cria a seção sozinho na página
// - projectLink é opcional: mostra o botão "Ver Projeto"
// - O ícone de PDF ou imagem é escolhido sozinho pela extensão do arquivo em link

export const certificates: CertificateEntry[] = [
    {
        title: { pt: 'Engenharia de Prompts com IA', en: 'AI Prompt Engineering' },
        institution: 'Udemy',
        year: 2026,
        link: '/assets/Certificado Engenharia de Prompts com IA.webp',
    },
    {
        title: 'HTML & CSS Impressionador',
        institution: 'Hashtag Treinamentos',
        year: 2026,
        link: '/assets/Certificado HTML & CSS - Hashtag Treinamentos.pdf',
    },
    {
        title: 'AWS Impressionador',
        institution: 'Hashtag Treinamentos',
        year: 2026,
        link: '/assets/Certificado AWS Impressionador - Hashtag Treinamentos.pdf',
    },
    {
        title: { pt: 'Curso Completo de Macros e VBA', en: 'Complete Macros and VBA Course' },
        institution: 'Udemy',
        year: 2026,
        link: '/assets/Certificado Curso Completo de Macros e VBA.webp',
    },
    {
        title: { pt: 'Educação Corporativa', en: 'Corporate Education' },
        institution: 'Conquer in Company',
        year: 2025,
        link: '/assets/Certificado T&D Educação Corporativa Conquer.webp',
    },
    {
        title: { pt: 'SQL e Banco de Dados', en: 'SQL and Databases' },
        institution: 'Udemy',
        year: 2025,
        link: '/assets/Certificado SQL e Banco de Dados.webp',
    },
    {
        title: { pt: 'Performance APIS', en: 'APIs Performance' },
        institution: 'Udemy',
        year: 2025,
        link: '/assets/Certificado Postman 2025 - Performance APIs.webp',
    },
    {
        title: { pt: 'Formação Angular', en: 'Angular Training' },
        institution: 'Udemy',
        year: 2025,
        link: '/assets/Certificado Formação em Angular.webp',
    },
    {
        title: { pt: 'Formação Completa em IA', en: 'Complete AI Training' },
        institution: 'Udemy',
        year: 2025,
        link: '/assets/Certificado Formação Completa IA - 2025.webp',
    },
    {
        title: 'Lean Six Sigma Black Belt',
        institution: { pt: 'FM2S - Educação e Consultoria', en: 'FM2S - Education and Consulting' },
        year: 2025,
        link: '/assets/Certificado -  Lean Six Sigma Black Belt - FM2S.webp',
        projectLink: '/assets/Black-Belt-Projeto-Final- Leon Rodrigues Hauck.pdf',
    },
    {
        title: { pt: 'OKR - Objetivos e Resultados', en: 'OKR - Objectives and Key Results' },
        institution: { pt: 'FM2S - Educação e Consultoria', en: 'FM2S - Education and Consulting' },
        year: 2025,
        link: '/assets/Certificado - OKR - Objectives and Key Results - FM2S.webp',
    },
    {
        title: { pt: 'Inteligência Artificial', en: 'Artificial Intelligence' },
        institution: 'Conquer Business School',
        year: 2024,
        link: '/assets/Certificado Inteligência Artificial.webp',
    },
    {
        title: { pt: 'Método Kanban', en: 'Kanban Method' },
        institution: { pt: 'FM2S - Educação e Consultoria', en: 'FM2S - Education and Consulting' },
        year: 2024,
        link: '/assets/Certificado -  Método Kanban FM2S.webp',
    },
    {
        title: { pt: 'Pacote Office', en: 'Office Suite' },
        institution: 'Udemy',
        year: 2024,
        link: '/assets/Certificado Pacote Office Essencial.webp',
    },
    {
        title: { pt: 'Formação Spark com Pyspark', en: 'Spark with Pyspark Training' },
        institution: 'Udemy',
        year: 2024,
        link: '/assets/Certificado Formação Spark Com Pyspark.webp',
    },
    {
        title: { pt: 'Programação com Python', en: 'Python Programming' },
        institution: { pt: 'Instituto AARON SWARTZ', en: 'AARON SWARTZ Institute' },
        year: 2023,
        link: '/assets/Certificado de Introdução Programação com Python - Aaron.pdf',
    },
    {
        title: { pt: 'Comunicação e Oratória', en: 'Communication and Public Speaking' },
        institution: { pt: 'Escola Conquer', en: 'Conquer School' },
        year: 2023,
        link: '/assets/Certificado de Comunicação e Oratória - Conquer.webp',
    },
    {
        title: { pt: 'Inteligência Emocional', en: 'Emotional Intelligence' },
        institution: { pt: 'Escola Conquer Plus', en: 'Conquer School Plus' },
        year: 2023,
        link: '/assets/Certificado Inteligência Emociona 2.0 Conquer.webp',
    },
    {
        title: { pt: 'Análise de Dados e Power BI', en: 'Data Analysis and Power BI' },
        institution: { pt: 'Escola Conquer', en: 'Conquer School' },
        year: 2023,
        link: '/assets/Certificado Análise de Dados e Power BI Conquer.webp',
    },
    {
        title: { pt: 'Excel Completo', en: 'Complete Excel' },
        institution: 'Udemy',
        year: 2023,
        link: '/assets/Cetificado Curso Excel Completo.webp',
    },
    {
        title: { pt: 'Formação em Liderança', en: 'Leadership Training' },
        institution: { pt: 'Escola Conquer', en: 'Conquer School' },
        year: 2022,
        link: '/assets/Certificado Formação em Liderança conquer.webp',
    },
];
