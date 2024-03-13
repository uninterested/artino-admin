/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        'color-auto': 'var(--color-text-1)',
        'color-auto-2': 'var(--color-text-2)',
        'color-auto-3': 'var(--color-text-3)',
        'color-active': 'rgb(var(--primary-6))',
        'color-danger': 'rgb(var(--danger-6))',
      },
      backgroundColor: {
        'bg': 'var(--color-bg-1)',
        'alpha': 'var(--color-fill-2)',
        'alpha-1': 'var(--color-fill-1)',
        'alpha-3': 'var(--color-fill-3)',
        'hover': 'var(--color-fill-2)', // 普通按钮hover
        'active': 'var(--color-primary-light-1)'
      },
      borderColor: {
        'bg': 'var(--color-bg-1)',
        'hover': 'var(--color-fill-2)',
        'primary': 'rgb(var(--primary-6))',
        'alpha': 'var(--color-border)',
        'auto-2': 'var(--color-text-2)',
      }
    },
  },
  plugins: [],
}

