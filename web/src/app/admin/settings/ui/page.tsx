'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  Sparkles,
  Search,
  Mail,
  Lock
} from 'lucide-react';

export default function UIPlayground() {
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-neutral-dark-onSurfaceHigh">
          UI Components Playground
        </h1>
        <p className="text-neutral-dark-onSurfaceLow">
          Teste todos os componentes do design system Rapidus usando tokens.
        </p>
      </div>

      {/* Buttons Section */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Botões usando tokens semânticos e de acento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Variants */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Primary Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="info">Info</Button>
            </div>
          </div>

          {/* Accent Variants */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Accent Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="accent">Violet</Button>
              <Button variant="accent-cyan">Cyan</Button>
              <Button variant="accent-lime">Lime</Button>
              <Button variant="accent-pink">Pink</Button>
              <Button variant="accent-teal">Teal</Button>
              <Button variant="accent-amber">Amber</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Settings className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards Section */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Cards</CardTitle>
          <CardDescription>
            Cards com diferentes variantes e estados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Card padrão com borda neutra</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-dark-onSurfaceLow">
                  Conteúdo do card padrão usando tokens neutros.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card com sombra e hover</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-dark-onSurfaceLow">
                  Card elevado com efeito hover interativo.
                </p>
              </CardContent>
            </Card>

            <Card variant="accent">
              <CardHeader>
                <CardTitle>Accent Card</CardTitle>
                <CardDescription>Card com tema de acento</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-dark-onSurfaceLow">
                  Card com cores de acento violet.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>Card com borda destacada</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-dark-onSurfaceLow">
                  Card com borda mais espessa para destaque.
                </p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>Card com borda destacada</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-dark-onSurfaceLow">
                  Card com borda mais espessa para destaque.
                </p>
              </CardContent>
            </Card>

            <Card variant="accent-teal">
              <CardHeader>
                <CardTitle>Teal Accent</CardTitle>
                <CardDescription>Card com tema teal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-dark-onSurfaceLow">
                  Card com cores de acento teal.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Inputs Section */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>
            Campos de entrada com diferentes variantes e estados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              placeholder="seu@email.com"
              leftIcon={<Mail className="h-4 w-4" />}
              helpText="Digite seu endereço de email"
            />
            
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              helpText="Mínimo 8 caracteres"
            />
            
            <Input
              label="Buscar"
              placeholder="Digite sua busca..."
              leftIcon={<Search className="h-4 w-4" />}
              variant="ghost"
            />
            
            <Input
              label="Campo com erro"
              placeholder="Digite algo..."
              error="Este campo é obrigatório"
            />
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>
            Badges com diferentes variantes e tamanhos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Variants */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Primary Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Accent Variants */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Accent Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">Violet</Badge>
              <Badge variant="accent-cyan">Cyan</Badge>
              <Badge variant="accent-lime">Lime</Badge>
              <Badge variant="accent-pink">Pink</Badge>
              <Badge variant="accent-teal">Teal</Badge>
              <Badge variant="accent-amber">Amber</Badge>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">With Icons</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" leftIcon={<Check className="h-3 w-3" />}>Approved</Badge>
              <Badge variant="danger" leftIcon={<X className="h-3 w-3" />}>Rejected</Badge>
              <Badge variant="warning" leftIcon={<AlertCircle className="h-3 w-3" />}>Warning</Badge>
              <Badge variant="info" leftIcon={<Info className="h-3 w-3" />}>Info</Badge>
              <Badge variant="accent" leftIcon={<Sparkles className="h-3 w-3" />}>Premium</Badge>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Switches Section */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Switches</CardTitle>
          <CardDescription>
            Switches com diferentes variantes e estados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Switch
              label="Notificações"
              helpText="Receber notificações por email"
              checked={switchValue}
              onCheckedChange={setSwitchValue}
            />
            
            <Switch
              label="Tema escuro"
              helpText="Usar tema escuro por padrão"
              variant="accent"
            />
            
            <Switch
              label="Modo desenvolvedor"
              helpText="Ativar recursos de desenvolvimento"
              variant="success"
            />
            
            <Switch
              label="Modo perigoso"
              helpText="Cuidado! Esta opção pode causar problemas"
              variant="danger"
              error="Esta opção não é recomendada"
            />
            
            <Switch
              label="Cyan accent"
              variant="accent-cyan"
            />
            
            <Switch
              label="Lime accent"
              variant="accent-lime"
            />
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Paleta de cores do design system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Brand Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-brand-primary mb-2"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-neutral-dark-onSurfaceLow">#4F46E5</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-brand-primaryHover mb-2"></div>
                <p className="text-sm font-medium">Primary Hover</p>
                <p className="text-xs text-neutral-dark-onSurfaceLow">#4338CA</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-brand-primaryMuted mb-2"></div>
                <p className="text-sm font-medium">Primary Muted</p>
                <p className="text-xs text-neutral-dark-onSurfaceLow">#EEF2FF</p>
              </div>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Accent Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-accent-violet-base mb-2"></div>
                <p className="text-sm font-medium">Violet</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-accent-cyan-base mb-2"></div>
                <p className="text-sm font-medium">Cyan</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-accent-lime-base mb-2"></div>
                <p className="text-sm font-medium">Lime</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-accent-pink-base mb-2"></div>
                <p className="text-sm font-medium">Pink</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-accent-teal-base mb-2"></div>
                <p className="text-sm font-medium">Teal</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-accent-amber-base mb-2"></div>
                <p className="text-sm font-medium">Amber</p>
              </div>
            </div>
          </div>

          {/* Feedback Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Feedback Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-feedback-success mb-2"></div>
                <p className="text-sm font-medium">Success</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-feedback-warning mb-2"></div>
                <p className="text-sm font-medium">Warning</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-feedback-danger mb-2"></div>
                <p className="text-sm font-medium">Danger</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-feedback-info mb-2"></div>
                <p className="text-sm font-medium">Info</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}