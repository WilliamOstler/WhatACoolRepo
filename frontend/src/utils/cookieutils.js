import Cookies from 'js-cookie';

export const getMemberIdFromCookies = () => {
    return Cookies.get('memberId') || '';
};

export const getMemberNameFromCookies = () => {
    return Cookies.get('memberName') || '';
}