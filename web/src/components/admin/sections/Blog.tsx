'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import { Panel } from '../ui';

type BlogContent = SiteConfig['content']['blog'];
type BlogArticle = BlogContent['articles'][number];

export default function BlogAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.blog ?? { enabled: true, position: 6 };
  const currentContent: BlogContent = {
    ...(config.content?.blog ?? { title: '', subtitle: '', articles: [] }),
    ...((section.content as BlogContent | undefined) ?? {}),
  };

  const updateBlog = (content: BlogContent) => {
    updateConfig({
      sections: {
        ...config.sections,
        blog: {
          ...section,
          content,
        },
      },
      content: {
        ...config.content,
        blog: content,
      },
    });
  };

  const handleFieldChange = (key: keyof BlogContent, value: string | BlogArticle[]) => {
    updateBlog({
      ...currentContent,
      [key]: value as never,
    });
  };

  const articles = Array.isArray(currentContent.articles) ? currentContent.articles : [];

  const updateArticle = (index: number, patch: Partial<BlogArticle>) => {
    const next = articles.map((article, i) => (i === index ? { ...article, ...patch } : article));
    handleFieldChange('articles', next);
  };

  const addArticle = () => {
    const count = articles.length + 1;
    handleFieldChange('articles', [
      ...articles,
      {
        title: `Novo artigo ${count}`,
        category: '',
        excerpt: '',
        date: new Date().toISOString().slice(0, 10),
        image: '',
      },
    ]);
  };

  const removeArticle = (index: number) => {
    handleFieldChange('articles', articles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Blog</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={currentContent.title ?? ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Últimas do Blog"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subtítulo</label>
            <textarea
              value={currentContent.subtitle ?? ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              rows={3}
              placeholder="Resumo do conteúdo do blog"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Artigos</h3>}>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="space-y-3 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Artigo #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeArticle(index)}
                  className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Título</label>
                  <input
                    type="text"
                    value={article.title ?? ''}
                    onChange={(e) => updateArticle(index, { title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Categoria</label>
                  <input
                    type="text"
                    value={article.category ?? ''}
                    onChange={(e) => updateArticle(index, { category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Resumo</label>
                <textarea
                  value={article.excerpt ?? ''}
                  onChange={(e) => updateArticle(index, { excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Data</label>
                  <input
                    type="date"
                    value={(article.date ?? '').slice(0, 10)}
                    onChange={(e) => updateArticle(index, { date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Imagem (URL)</label>
                  <input
                    type="text"
                    value={article.image ?? ''}
                    onChange={(e) => updateArticle(index, { image: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addArticle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Adicionar artigo
          </button>
        </div>
      </Panel>
    </div>
  );
}
