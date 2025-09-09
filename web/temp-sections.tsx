              )}

              {/* Features Section */}
              {activeSection === 'features' && (
                <div className="space-y-3">
                  {/* Toggle da seção */}
                  <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium text-sm">Seção Features</h3>
                      <p className="text-slate-400 text-xs">Diferenciais e características</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('features')}
                      className={`w-8 h-4 rounded-full transition-all duration-200 ${
                        config.sections.features?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.features?.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Conteúdo */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white flex items-center">
                      <Type className="w-3 h-3 mr-1 text-blue-400" />
                      Conteúdo
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Título da Seção
                        </label>
                        <input
                          type="text"
                          value={config.sections.features?.content?.title || ''}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              features: {
                                enabled: config.sections.features?.enabled ?? false,
                                position: config.sections.features?.position ?? 2,
                                ...config.sections.features,
                                content: {
                                  ...config.sections.features?.content,
                                  title: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                          placeholder="Título da seção"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={config.sections.features?.content?.subtitle || ''}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              features: {
                                enabled: config.sections.features?.enabled ?? false,
                                position: config.sections.features?.position ?? 2,
                                ...config.sections.features,
                                content: {
                                  ...config.sections.features?.content,
                                  subtitle: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                          placeholder="Subtítulo da seção"
                        />
                      </div>
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
                        value={config.sections.features?.style?.titleColor || '#FFFFFF'}
                        onChange={(color) => updateConfig({
                          sections: {
                            ...config.sections,
                            features: {
                              enabled: config.sections.features?.enabled ?? false,
                              position: config.sections.features?.position ?? 2,
                              ...config.sections.features,
                              style: {
                                ...config.sections.features?.style,
                                titleColor: color
                              }
                            }
                          }
                        })}
                      />

                      <ColorPicker
                        label="Cor do Subtítulo"
                        value={config.sections.features?.style?.subtitleColor || '#E2E8F0'}
                        onChange={(color) => updateConfig({
                          sections: {
                            ...config.sections,
                            features: {
                              enabled: config.sections.features?.enabled ?? false,
                              position: config.sections.features?.position ?? 2,
                              ...config.sections.features,
                              style: {
                                ...config.sections.features?.style,
                                subtitleColor: color
                              }
                            }
                          }
                        })}
                      />

                      <FontSizePicker
                        label="Tamanho do Título"
                        value={config.sections.features?.style?.titleSize || 'text-lg'}
                        onChange={(size) => updateConfig({
                          sections: {
                            ...config.sections,
                            features: {
                              enabled: config.sections.features?.enabled ?? false,
                              position: config.sections.features?.position ?? 2,
                              ...config.sections.features,
                              style: {
                                ...config.sections.features?.style,
                                titleSize: size
                              }
                            }
                          }
                        })}
                      />

                      <ColorPicker
                        label="Cor de Fundo"
                        value={config.sections.features?.style?.backgroundColor || '#1E293B'}
                        onChange={(color) => updateConfig({
                          sections: {
                            ...config.sections,
                            features: {
                              enabled: config.sections.features?.enabled ?? false,
                              position: config.sections.features?.position ?? 2,
                              ...config.sections.features,
                              style: {
                                ...config.sections.features?.style,
                                backgroundColor: color
                              }
                            }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Services Section */}
              {activeSection === 'services' && (
                <div className="space-y-3">
                  {/* Toggle da seção */}
                  <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium text-sm">Seção Services</h3>
                      <p className="text-slate-400 text-xs">Nossos serviços</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('services')}
                      className={`w-8 h-4 rounded-full transition-all duration-200 ${
                        config.sections.services?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.services?.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Conteúdo */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white flex items-center">
                      <Type className="w-3 h-3 mr-1 text-blue-400" />
                      Conteúdo
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Título da Seção
                        </label>
                        <input
                          type="text"
                          value={config.sections.services?.content?.title || ''}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              services: {
                                enabled: config.sections.services?.enabled ?? false,
                                position: config.sections.services?.position ?? 3,
                                ...config.sections.services,
                                content: {
                                  ...config.sections.services?.content,
                                  title: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                          placeholder="Título da seção"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={config.sections.services?.content?.subtitle || ''}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              services: {
                                enabled: config.sections.services?.enabled ?? false,
                                position: config.sections.services?.position ?? 3,
                                ...config.sections.services,
                                content: {
                                  ...config.sections.services?.content,
                                  subtitle: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                          placeholder="Subtítulo da seção"
                        />
                      </div>
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
                        value={config.sections.services?.style?.titleColor || '#FFFFFF'}
                        onChange={(color) => updateConfig({
                          sections: {
                            ...config.sections,
                            services: {
                              enabled: config.sections.services?.enabled ?? false,
                              position: config.sections.services?.position ?? 3,
                              ...config.sections.services,
                              style: {
                                ...config.sections.services?.style,
                                titleColor: color
                              }
                            }
                          }
                        })}
                      />

                      <ColorPicker
                        label="Cor do Subtítulo"
                        value={config.sections.services?.style?.subtitleColor || '#E2E8F0'}
                        onChange={(color) => updateConfig({
                          sections: {
                            ...config.sections,
                            services: {
                              enabled: config.sections.services?.enabled ?? false,
                              position: config.sections.services?.position ?? 3,
                              ...config.sections.services,
                              style: {
                                ...config.sections.services?.style,
                                subtitleColor: color
                              }
                            }
                          }
                        })}
                      />

                      <FontSizePicker
                        label="Tamanho do Título"
                        value={config.sections.services?.style?.titleSize || 'text-3xl'}
                        onChange={(size) => updateConfig({
                          sections: {
                            ...config.sections,
                            services: {
                              enabled: config.sections.services?.enabled ?? false,
                              position: config.sections.services?.position ?? 3,
                              ...config.sections.services,
                              style: {
                                ...config.sections.services?.style,
                                titleSize: size
                              }
                            }
                          }
                        })}
                      />

                      <ColorPicker
                        label="Cor de Fundo"
                        value={config.sections.services?.style?.backgroundColor || '#0F172A'}
                        onChange={(color) => updateConfig({
                          sections: {
                            ...config.sections,
                            services: {
                              enabled: config.sections.services?.enabled ?? false,
                              position: config.sections.services?.position ?? 3,
                              ...config.sections.services,
                              style: {
                                ...config.sections.services?.style,
                                backgroundColor: color
                              }
                            }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Outras seções podem ser adicionadas aqui */}
