/**
 * TEMPLATE — not loaded by the app. To activate a patient profile, copy this
 * file to `<name>.local.ts` in this folder and fill it with real data. Only a
 * `*.local.ts` file is picked up by `index.ts`, and `*.local.ts` is gitignored
 * so a patient's health data never lands in the repo.
 *
 * `stance` is what the report says ('recommended' | 'avoid'); the app derives
 * whether that clashes with the FODMAP status (see `patientView` in
 * `src/lib/patient.ts`) and renders a "conflict" label when it does.
 */
import type { PatientProfile } from '../../lib/patient'

const example: PatientProfile = {
  name: 'Pacient exemplu',
  conditions: ['exemplu'],
  summary: 'Rezumat de strategie nutrițională — un paragraf (exemplu fictiv).',
  foods: [
    { foodId: 'somon', stance: 'recommended', reason: 'Exemplu de motiv.' },
    {
      foodId: 'usturoi',
      stance: 'recommended',
      reason: 'Exemplu — recomandat de raport, dar high-FODMAP (devine conflict).',
      fodmapNote: 'high-FODMAP (fructani).',
    },
    { foodId: 'zahar', stance: 'avoid', reason: 'Exemplu de motiv.' },
  ],
  supplements: [{ name: 'Omega-3', dose: '2000 mg/zi', role: 'Exemplu de rol.' }],
  lifestyle: [{ title: 'Somn', detail: 'Exemplu de recomandare.' }],
  provenance: 'Exemplu — sursa recomandărilor.',
}

export default example
