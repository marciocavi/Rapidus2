export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Admin</h1>
      {children}
    </section>
  );
}

