/* eslint-disable prettier/prettier */
export default function (errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Geçersiz email adresi';
        case 'auth/email-already-in-use':
            return 'Bu email adresi zaten kullanımda';
        case 'auth/weak-password':
            return 'Şifre en az 6 karakter olmalıdır';
        case 'auth/user-not-found':
            return 'Bu email adresi ile kayıtlı kullanıcı bulunamadı';
        case 'auth/wrong-password':
            return 'Şifre hatalı';
        case 'auth/too-many-requests':
            return 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyiniz';
        case 'auth/network-request-failed':
            return 'İnternet bağlantınızı kontrol ediniz';
        case 'auth/user-disabled':
            return 'Bu kullanıcı engellenmiş';
        case 'auth/operation-not-allowed':
            return 'Bu işlem şu anda devre dışı';
        case 'auth/account-exists-with-different-credential':
            return 'Bu email adresi ile başka bir hesap var';
        case 'auth/credential-already-in-use':
            return 'Bu kimlik bilgileri ile başka bir hesap var';
        case 'auth/invalid-credential':
            return 'Geçersiz kimlik bilgileri';
        case 'auth/invalid-verification-code':
            return 'Geçersiz doğrulama kodu';
        case 'auth/invalid-verification-id':
            return 'Geçersiz doğrulama kodu';
        default:
            return 'Bir hata oluştu';
    }
}

