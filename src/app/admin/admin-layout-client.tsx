'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Zap,
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  Settings,
  HelpCircle,
  LogOut,
  ArrowLeft,
  ArrowRight,
  Menu,
  Loader2,
  Mail,
  FileText,
} from 'lucide-react';
import { Logo, LogoIcon } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';

function useNavItems() {
  const { t } = useLocale();
  return [
    { href: '/admin/dashboard', label: t('admin_dashboard'), icon: LayoutDashboard },
    { href: '/admin/projects', label: t('admin_projects'), icon: FolderKanban },
    { href: '/admin/blog', label: t('admin_blog'), icon: FileText },
    { href: '/admin/testimonials', label: t('admin_testimonials'), icon: MessageSquareQuote },
    { href: '/admin/services', label: t('admin_services'), icon: Settings },
    { href: '/admin/faqs', label: t('admin_faqs'), icon: HelpCircle },
    { href: '/admin/contacts', label: t('admin_messages'), icon: Mail },
    { href: '/admin/settings', label: t('admin_settings'), icon: Settings },
  ];
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const router = useRouter();
  const { t, isRTL } = useLocale();
  const navItems = useNavItems();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 mt-4">
        <Logo />
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <BackArrow className="size-4" />
          {t('admin_back_to_site')}
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="size-4" />
          {t('admin_logout')}
        </button>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isRTL } = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect logic handled via effect, not during render
  useEffect(() => {
    if (isAuthenticated === true && pathname === '/admin') {
      router.replace('/admin/dashboard');
      return;
    }
    if (isAuthenticated === false && pathname !== '/admin') {
      router.replace('/admin');
    }
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [pathname]);

  // If we're on the login page
  if (pathname === '/admin') {
    if (isAuthenticated === true) {
      return <LoadingScreen />;
    }
    if (isAuthenticated === false) {
      return <>{children}</>;
    }
    return <LoadingScreen />;
  }

  // For all other admin pages, require auth
  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  if (isAuthenticated === false) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-e bg-background z-30',
        isRTL ? 'lg:right-0' : 'lg:left-0'
      )}>
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-0 start-0 end-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? 'right' : 'left'} className="p-0 w-64">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <LogoIcon size={28} />
          <span className="text-sm font-bold tracking-tight">
            asra3<span className="text-primary">.com</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className={cn(
        'flex-1 overflow-y-auto',
        isRTL ? 'lg:mr-64' : 'lg:ml-64'
      )}>
        <div className="pt-14 lg:pt-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
