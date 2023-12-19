
class Helper {
  static findCodeInEmails(emailContent, signatureEmailCodeRegExp) {
    const signatureEmailCodeRegExpResult = signatureEmailCodeRegExp.exec(emailContent);
    const code = signatureEmailCodeRegExpResult && signatureEmailCodeRegExpResult.length > 2 ? signatureEmailCodeRegExpResult[2] : null;
    return code;
  }
  static formatConnectionData(data) {
    const VAD_USER = {};
    VAD_USER.LucaUserName = data.LucaUserName;
    VAD_USER.LucaEmail = data.LucaEmail;
    VAD_USER.LucaPassword = data.LucaPassword;
    VAD_USER.WrongEmail = data.WrongEmail;
    VAD_USER.WrongPassword = data.WrongPassword;
    VAD_USER.DownloadsFolder = data.DownloadsFolder;
    VAD_USER.EmailForSignature = data.EmailForSignature;
    VAD_USER.EmailPasswordForSignature = data.EmailPasswordForSignature;
    VAD_USER.SofiaUserName = data.SofiaUserName;
    VAD_USER.SofiaEmail = data.SofiaEmail;
    VAD_USER.SofiaPassword = data.SofiaPassword;
    VAD_USER.SofiaUrl = data.SofiaUrl;

    const NO_VAD_USER = {};
    NO_VAD_USER.LucaUserName = data.NoVADLucaUserName;
    NO_VAD_USER.LucaEmail = data.NoVADLucaEmail;
    NO_VAD_USER.LucaPassword = data.NoVADLucaPassword;
    NO_VAD_USER.WrongEmail = data.WrongEmail;
    NO_VAD_USER.WrongPassword = data.WrongPassword;
    NO_VAD_USER.DownloadsFolder = data.DownloadsFolder;
    NO_VAD_USER.EmailForSignature = data.EmailForSignature;
    NO_VAD_USER.EmailPasswordForSignature = data.EmailPasswordForSignature;
    NO_VAD_USER.SofiaUserName = data.SofiaUserName;
    NO_VAD_USER.SofiaEmail = data.SofiaEmail;
    NO_VAD_USER.SofiaPassword = data.SofiaPassword;
    NO_VAD_USER.SofiaUrl = data.SofiaUrl;
    return { VAD_USER: VAD_USER, NO_VAD_USER: NO_VAD_USER };
  }
}
export default Helper;
