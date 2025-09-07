import { render, screen, fireEvent } from '@testing-library/react';
import { Shell, Panel, Field, Button, Toggle, Tabs } from '@/components/admin/ui';

// Mock environment variable
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('Modern Admin UI Components', () => {
  describe('Shell', () => {
    it('renders with modern flag enabled', () => {
      process.env.NEXT_PUBLIC_MODERN_ADMIN_UI = '1';
      
      render(
        <Shell modern={true} topbar={<div>Topbar</div>} sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </Shell>
      );

      expect(screen.getByText('Topbar')).toBeInTheDocument();
      expect(screen.getByText('Sidebar')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders without modern flag', () => {
      process.env.NEXT_PUBLIC_MODERN_ADMIN_UI = '0';
      
      render(
        <Shell modern={false} topbar={<div>Topbar</div>} sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </Shell>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Panel', () => {
    it('renders panel with header and footer', () => {
      render(
        <Panel 
          header={<div>Header</div>} 
          footer={<div>Footer</div>}
        >
          <div>Body</div>
        </Panel>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('renders panel without header and footer', () => {
      render(
        <Panel>
          <div>Body</div>
        </Panel>
      );

      expect(screen.getByText('Body')).toBeInTheDocument();
    });
  });

  describe('Field', () => {
    it('renders field with label and hint', () => {
      render(
        <Field label="Test Label" hint="Test Hint">
          <input />
        </Field>
      );

      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Hint')).toBeInTheDocument();
    });

    it('renders field with error', () => {
      render(
        <Field label="Test Label" error="Test Error">
          <input />
        </Field>
      );

      expect(screen.getByText('Test Error')).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    it('renders primary button', () => {
      render(<Button variant="primary">Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders disabled button', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByText('Disabled')).toBeDisabled();
    });
  });

  describe('Toggle', () => {
    it('renders toggle in off state', () => {
      render(<Toggle checked={false} onChange={jest.fn()} />);
      // Toggle should be rendered
    });

    it('handles toggle change', () => {
      const handleChange = jest.fn();
      render(<Toggle checked={false} onChange={handleChange} />);
      
      fireEvent.click(screen.getByRole('button', { hidden: true }));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('renders disabled toggle', () => {
      render(<Toggle checked={false} onChange={jest.fn()} disabled />);
      // Should be disabled
    });
  });

  describe('Tabs', () => {
    const mockTabs = [
      { id: 'tab1', label: 'Tab 1', isActive: true, onClick: jest.fn() },
      { id: 'tab2', label: 'Tab 2', isActive: false, onClick: jest.fn() }
    ];

    it('renders tabs', () => {
      render(
        <Tabs 
          tabs={mockTabs} 
          activeTab="tab1" 
          onTabChange={jest.fn()} 
        />
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });

    it('handles tab change', () => {
      const handleTabChange = jest.fn();
      render(
        <Tabs 
          tabs={mockTabs} 
          activeTab="tab1" 
          onTabChange={handleTabChange} 
        />
      );

      fireEvent.click(screen.getByText('Tab 2'));
      expect(handleTabChange).toHaveBeenCalledWith('tab2');
    });
  });
});
