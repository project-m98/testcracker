// app/page.tsx
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

async function getHealth() {
  if (!API_BASE) {
    return { ok: false, error: 'API base URL not set' };
  }

  try {
    const res = await fetch(`${API_BASE}/health`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    const text = (await res.text()).trim();
    if (text === 'healthy') {
      return { ok: true, data: { message: text } };
    }

    return { ok: false, error: `Unexpected response: "${text}"` };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? 'Network error' };
  }
}

export default async function Home() {
  const health = await getHealth();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold">
              T
            </span>
            <div>
              <h1 className="text-lg font-semibold">Testcracker</h1>
              <p className="text-xs text-slate-400">
                Mock tests for SSC CGL, CHSL & more
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden text-slate-400 md:inline">
              API status:
            </span>
            {health.ok ? (
              <span className="rounded-full bg-emerald-900/40 px-3 py-1 text-emerald-300">
                {health.data?.message}
              </span>
            ) : (
              <span className="rounded-full bg-red-900/40 px-3 py-1 text-red-300">
                API issue
              </span>
            )}

            <Link
              href="/login"
              className="rounded-full bg-slate-800 px-3 py-1 text-xs hover:bg-slate-700"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-5">
          <p className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs text-indigo-300">
            SSC CGL • SSC CHSL • Other govt exams
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Crack your next exam with real exam-like{' '}
            <span className="text-indigo-400">mock tests</span>.
          </h2>
          <p className="max-w-xl text-sm text-slate-300">
            Practice full-length tests, track your performance, and improve
            your speed & accuracy. Testcracker is built for serious aspirants
            who want exam-like experience from home.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Create free account
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-semibold hover:bg-slate-800"
            >
              I already have an account
            </Link>
          </div>

          <ul className="mt-4 grid gap-2 text-xs text-slate-300 md:grid-cols-2">
            <li>• Section-wise & full-length mocks</li>
            <li>• Instant result & detailed analysis</li>
            <li>• SSC pattern-based questions</li>
            <li>• Works on mobile & desktop</li>
          </ul>
        </div>

        {/* Right side: auth box */}
        <div className="mt-8 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl md:mt-0">
          <h3 className="text-sm font-semibold">Get started</h3>
          <p className="mt-1 text-xs text-slate-400">
            Login if you already have an account, or sign up in under 1
            minute using your mobile number.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <Link
              href="/login"
              className="block rounded-lg bg-slate-800 px-4 py-2 text-center font-medium hover:bg-slate-700"
            >
              Login with mobile number
            </Link>
            <Link
              href="/signup"
              className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white hover:bg-indigo-500"
            >
              Sign up for Testcracker
            </Link>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
            During signup, we&apos;ll verify your mobile number with an OTP.
            You&apos;ll use this mobile number and password to login, and
            you can reset your password later using OTP verification.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} Testcracker. All rights reserved.</span>
          <span>Made for SSC and other govt job aspirants.</span>
        </div>
      </footer>
    </main>
  );
}
