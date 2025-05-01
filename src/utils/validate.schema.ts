import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password cần tối thiểu 6 ký tự!')
        .max(50, 'Password tối đa 50 kí tự!')
        .required('Password không được để trống!'),
    email: Yup.string()
        .email('Định dạng email không hợp lệ!')
        .required('Email không được để trống!'),
    name: Yup.string()
        .required('Họ tên không được để trống!'),
});

export const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password cần tối thiểu 6 ký tự!')
        .max(50, 'Password tối đa 50 kí tự!')
        .required('Password không được để trống!'),
    email: Yup.string()
        .email('Định dạng email không hợp lệ!')
        .required('Email không được để trống!'),
});

export const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
        .required('Họ tên không được để trống!'),
    phone: Yup.string()
        .required('Số điện thoại không được để trống!'),
});

export const UpdateUserPasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, 'Mật khẩu hiện tại cần tối thiểu 6 ký tự')
        .max(50, 'Mật khẩu hiện tại cần tối đa 50 ký tự')
        .required('Mật khẩu hiện tại không được để trống'),
    newPassword: Yup.string()
        .min(6, 'Mật khẩu mới cần tối thiểu 6 ký tự')
        .max(50, 'Mật khẩu mới cần tối đa 50 ký tự')
        .required('Mật khẩu mới không được để trống')
        .test(
            'not-same-as-current',
            'Mật khẩu mới không được trùng với mật khẩu hiện tại',
            function (value) {
                const { currentPassword } = this.parent;
                return value !== currentPassword;
            }
        ),

    confirmNewPassword: Yup.string()
        .required('Xác nhận mật khẩu mới không được để trống')
        .oneOf([Yup.ref('newPassword')], 'Password phải khớp nhau!'),
});