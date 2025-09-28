'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import { Panel } from '../ui';

type InstagramContent = SiteConfig['content']['instagram'];
type InstagramPost = InstagramContent['posts'][number];

export default function InstagramAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.instagram ?? { enabled: true, position: 5 };
  const currentContent: InstagramContent = {
    ...(config.content?.instagram ?? { title: '', subtitle: '', handle: '', posts: [] }),
    ...((section.content as InstagramContent | undefined) ?? {}),
  };

  const updateInstagram = (content: InstagramContent) => {
    updateConfig({
      sections: {
        ...config.sections,
        instagram: {
          ...section,
          content,
        },
      },
      content: {
        ...config.content,
        instagram: content,
      },
    });
  };

  const handleFieldChange = (key: keyof InstagramContent, value: string | InstagramPost[]) => {
    updateInstagram({
      ...currentContent,
      [key]: value as never,
    });
  };

  const posts = Array.isArray(currentContent.posts) ? currentContent.posts : [];

  const updatePost = (index: number, patch: Partial<InstagramPost>) => {
    const next = posts.map((post, i) => (i === index ? { ...post, ...patch } : post));
    handleFieldChange('posts', next);
  };

  const addPost = () => {
    const count = posts.length + 1;
    handleFieldChange('posts', [
      ...posts,
      {
        caption: `Highlight ${count}`,
        image: '',
      },
    ]);
  };

  const removePost = (index: number) => {
    handleFieldChange('posts', posts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Instagram</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={currentContent.title ?? ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Ex: Siga-nos no Instagram"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subtítulo</label>
            <textarea
              value={currentContent.subtitle ?? ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              rows={3}
              placeholder="Descrição breve da sua presença nas redes"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">@handle</label>
            <input
              type="text"
              value={currentContent.handle ?? ''}
              onChange={(e) => handleFieldChange('handle', e.target.value)}
              placeholder="@rapidus_oficial"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Posts em destaque</h3>}>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="space-y-3 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Post #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removePost(index)}
                  className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Legenda</label>
                  <input
                    type="text"
                    value={post.caption ?? ''}
                    onChange={(e) => updatePost(index, { caption: e.target.value })}
                    placeholder="Legenda do post"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Imagem (URL)</label>
                  <input
                    type="text"
                    value={post.image ?? ''}
                    onChange={(e) => updatePost(index, { image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPost}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Adicionar post
          </button>
        </div>
      </Panel>
    </div>
  );
}
