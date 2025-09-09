// Seção Hero completa com todas as funcionalidades
{activeSection === 'hero' && (
  <div className="space-y-3">
    {/* Toggle da seção */}
    <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md border border-slate-600/30">
      <div>
        <h3 className="text-white font-medium text-sm">Seção Hero</h3>
        <p className="text-slate-400 text-xs">Configurações da seção principal do site</p>
      </div>
      <button
        onClick={() => handleSectionToggle('hero')}
        className={`w-8 h-4 rounded-full transition-all duration-200 ${
          config.sections.hero?.enabled
            ? 'bg-gradient-to-r from-green-500 to-blue-500'
            : 'bg-slate-600'
        }`}
      >
        <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
          config.sections.hero?.enabled ? 'translate-x-4' : 'translate-x-0.5'
        }`} />
      </button>
    </div>

    {/* Conteúdo */}
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white flex items-center">
        <Type className="w-3 h-3 mr-1 text-blue-400" />
        Conteúdo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Título Principal
          </label>
          <input
            type="text"
            value={config.sections.hero?.content?.title || ''}
            onChange={(e) => updateConfig({
              sections: {
                ...config.sections,
                hero: {
                  enabled: config.sections.hero?.enabled ?? false,
                  position: config.sections.hero?.position ?? 1,
                  ...config.sections.hero,
                  content: {
                    ...config.sections.hero?.content,
                    title: e.target.value
                  }
                }
              }
            })}
            className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Digite o título principal"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Subtítulo
          </label>
          <input
            type="text"
            value={config.sections.hero?.content?.subtitle || ''}
            onChange={(e) => updateConfig({
              sections: {
                ...config.sections,
                hero: {
                  enabled: config.sections.hero?.enabled ?? false,
                  position: config.sections.hero?.position ?? 1,
                  ...config.sections.hero,
                  content: {
                    ...config.sections.hero?.content,
                    subtitle: e.target.value
                  }
                }
              }
            })}
            className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Digite o subtítulo"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Botão Primário
          </label>
          <input
            type="text"
            value={config.sections.hero?.content?.primaryButton || ''}
            onChange={(e) => updateConfig({
              sections: {
                ...config.sections,
                hero: {
                  enabled: config.sections.hero?.enabled ?? false,
                  position: config.sections.hero?.position ?? 1,
                  ...config.sections.hero,
                  content: {
                    ...config.sections.hero?.content,
                    primaryButton: e.target.value
                  }
                }
              }
            })}
            className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Texto do botão"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Botão Secundário
          </label>
          <input
            type="text"
            value={config.sections.hero?.content?.secondaryButton || ''}
            onChange={(e) => updateConfig({
              sections: {
                ...config.sections,
                hero: {
                  enabled: config.sections.hero?.enabled ?? false,
                  position: config.sections.hero?.position ?? 1,
                  ...config.sections.hero,
                  content: {
                    ...config.sections.hero?.content,
                    secondaryButton: e.target.value
                  }
                }
              }
            })}
            className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Texto do botão secundário"
          />
        </div>
      </div>

      {/* Upload de Imagem */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Imagem de Fundo
        </label>
        <ImageUpload
          value={config.sections.hero?.content?.backgroundImage || ''}
          onChange={(url) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                content: {
                  ...config.sections.hero?.content,
                  backgroundImage: url
                }
              }
            }
          })}
          placeholder="Upload da imagem de fundo"
        />
      </div>
    </div>

    {/* Estilo */}
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white flex items-center">
        <Palette className="w-3 h-3 mr-1 text-purple-400" />
        Estilo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ColorPicker
          label="Cor do Título"
          value={config.sections.hero?.style?.titleColor || '#FFFFFF'}
          onChange={(color) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                style: {
                  ...config.sections.hero?.style,
                  titleColor: color
                }
              }
            }
          })}
        />

        <ColorPicker
          label="Cor do Subtítulo"
          value={config.sections.hero?.style?.subtitleColor || '#E2E8F0'}
          onChange={(color) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                style: {
                  ...config.sections.hero?.style,
                  subtitleColor: color
                }
              }
            }
          })}
        />

        <FontSizePicker
          label="Tamanho do Título"
          value={config.sections.hero?.style?.titleSize || 'text-4xl'}
          onChange={(size) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                style: {
                  ...config.sections.hero?.style,
                  titleSize: size
                }
              }
            }
          })}
        />

        <FontSizePicker
          label="Tamanho do Subtítulo"
          value={config.sections.hero?.style?.subtitleSize || 'text-lg'}
          onChange={(size) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                style: {
                  ...config.sections.hero?.style,
                  subtitleSize: size
                }
              }
            }
          })}
        />

        <ColorPicker
          label="Cor do Botão Primário"
          value={config.sections.hero?.style?.primaryButtonColor || '#3B82F6'}
          onChange={(color) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                style: {
                  ...config.sections.hero?.style,
                  primaryButtonColor: color
                }
              }
            }
          })}
        />

        <ColorPicker
          label="Cor do Texto do Botão Primário"
          value={config.sections.hero?.style?.primaryButtonTextColor || '#FFFFFF'}
          onChange={(color) => updateConfig({
            sections: {
              ...config.sections,
              hero: {
                enabled: config.sections.hero?.enabled ?? false,
                position: config.sections.hero?.position ?? 1,
                ...config.sections.hero,
                style: {
                  ...config.sections.hero?.style,
                  primaryButtonTextColor: color
                }
              }
            }
          })}
        />
      </div>
    </div>
  </div>
)}
