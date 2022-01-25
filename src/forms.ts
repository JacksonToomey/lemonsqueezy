import { useForm as useHookForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useForm = (
  schema: yup.AnyObjectSchema,
  opts: UseFormProps = { mode: 'onChange' },
): UseFormReturn => useHookForm({ ...opts, resolver: yupResolver(schema) });
