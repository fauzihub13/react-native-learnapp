import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('Username wajib diisi')
    .min(3, 'Username minimal 3 karakter'),
  password: Yup.string()
    .required('Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
});

export const productSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title wajib diisi')
    .min(3, 'Title minimal 3 karakter'),
  description: Yup.string()
    .trim()
    .required('Description wajib diisi')
    .min(10, 'Description minimal 10 karakter'),
  price: Yup.number()
    .required('Price wajib diisi')
    .typeError('Price harus berupa angka')
    .positive('Price harus lebih dari 0'),
  category: Yup.string()
    .trim()
    .required('Category wajib diisi'),
  brand: Yup.string()
    .trim()
    .optional(),
  stock: Yup.number()
    .optional()
    .typeError('Stock harus berupa angka')
    .integer('Stock harus bilangan bulat')
    .min(0, 'Stock tidak boleh negatif')
    .nullable(),
});

export const validateAsync = async <T>(
  schema: Yup.Schema<T>,
  data: T
): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors: Record<string, string> = {};
      err.inner.forEach((e) => {
        if (e.path) {
          errors[e.path] = e.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validasi gagal' } };
  }
};
