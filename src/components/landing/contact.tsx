'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Mail, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { type SiteData } from '@/hooks/use-site-data';
import { useLocale } from '@/lib/i18n';

interface ContactProps {
  data?: SiteData | null;
}

export function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const { t, isRTL } = useLocale();
  const contactEmail = data?.settings?.contact_email || 'hello@asra3.com';

  const contactInfo = [
    { icon: Mail, title: t('contact_email_title'), value: contactEmail, description: t('contact_email_desc') },
    { icon: Clock, title: t('contact_response_title'), value: t('contact_response_desc').includes('24') ? (isRTL ? 'خلال ٢٤ ساعة' : 'Within 24 hours') : t('contact_response_desc'), description: t('contact_response_desc') },
    { icon: MapPin, title: t('contact_location_title'), value: isRTL ? 'عن بُعد / جميع المناطق الزمنية' : 'Remote / Worldwide', description: t('contact_location_desc') },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    let finalBudget = formData.get('budget') as string || '';
    if (finalBudget === 'other') {
      finalBudget = formData.get('customBudget') as string || '';
    }

    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      mobile: formData.get('mobile') as string || '',
      projectType: formData.get('projectType') as string || '',
      budget: finalBudget,
      message: formData.get('message') as string,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(t('contact_error'));
      }
    } catch {
      setError(t('contact_network_error'));
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    { value: 'saas', label: t('contact_type_saas') },
    { value: 'automation', label: t('contact_type_automation') },
    { value: 'integration', label: t('contact_type_integration') },
    { value: 'mvp', label: t('contact_type_mvp') },
    { value: 'other', label: t('contact_type_other') },
  ];

  const budgetOptions = [
    { value: '0-500', label: isRTL ? '٠ - ٥٠٠$' : '$0 - $500' },
    { value: '500-1000', label: isRTL ? '٥٠٠$ - ١,٠٠٠$' : '$500 - $1,000' },
    { value: '1k-3k', label: isRTL ? '١,٠٠٠$ - ٣,٠٠٠$' : '$1,000 - $3,000' },
    { value: '3k-5k', label: isRTL ? '٣,٠٠٠$ - ٥,٠٠٠$' : '$3,000 - $5,000' },
    { value: '5k+', label: isRTL ? '+٥,٠٠٠$' : '$5,000+' },
    { value: 'other', label: isRTL ? 'أخرى' : 'Other' },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{t('contact_sub')}</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('contact_heading')} <span className="text-primary">{t('contact_heading_highlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('contact_desc')}</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 items-start">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{info.title}</p>
                    <p className="text-primary font-medium">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/50 p-6 mt-8">
              <p className="text-sm font-semibold mb-3">{t('contact_steps_heading')}</p>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                  {t('contact_step_1')}
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                  {t('contact_step_2')}
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
                  {t('contact_step_3')}
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">4</span>
                  {t('contact_step_4')}
                </li>
              </ol>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{t('contact_success_title')}</h3>
                  <p className="mt-2 text-muted-foreground">{t('contact_success_desc')}</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    {isRTL ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact_label_name')}</Label>
                      <Input name="name" id="name" placeholder={t('contact_placeholder_name')} required className="h-11 bg-background border-border/60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact_label_email')}</Label>
                      <Input name="email" id="email" type="email" placeholder={t('contact_placeholder_email')} required className="h-11 bg-background border-border/60" />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">{isRTL ? 'رقم الجوال (اختياري)' : 'Mobile Number (Optional)'}</Label>
                      <Input name="mobile" id="mobile" type="tel" placeholder={isRTL ? '+966 50 123 4567' : '+1 234 567 8900'} className="h-11 bg-background border-border/60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-type">{t('contact_label_type')}</Label>
                      <Select name="projectType">
                        <SelectTrigger id="project-type" className="h-11 bg-background border-border/60">
                          <SelectValue placeholder={t('contact_select_type')} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((pt) => (
                            <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t('contact_label_budget')}</Label>
                      <Select name="budget" onValueChange={setSelectedBudget}>
                        <SelectTrigger id="budget" className="h-11 bg-background border-border/60">
                          <SelectValue placeholder={t('contact_select_budget')} />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedBudget === 'other' && (
                      <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="customBudget">{isRTL ? 'ميزانية محددة' : 'Specific Budget'}</Label>
                        <Input name="customBudget" id="customBudget" placeholder={isRTL ? 'مثال: ٤٥٠$' : 'e.g. $450'} required className="h-11 bg-background border-border/60" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact_label_message')}</Label>
                    <Textarea name="message" id="message" placeholder={t('contact_placeholder_message')} rows={5} required maxLength={2000} className="bg-background border-border/60 resize-none" />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" size="lg" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto h-12 px-8 shadow-sm">
                    {loading ? (
                      <><Loader2 className="me-2 h-4 w-4 animate-spin" />{t('contact_sending')}</>
                    ) : (
                      <><Send className="me-2 h-4 w-4" />{t('contact_send')}</>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
