import { LoginRequestDto, LoginResponseDto, SignUpRequestDto, SignUpResponseDto, SendPasswordResetRequestDto, OperationResultDto, GetSessionRequestDto, SessionDto, ChangePasswordRequestDto, UpdateUserEmailDto, UpdateUserEmailResponseDto, UpdateUserPasswordDto, UpdateUserPasswordResponseDto, UpdateUserNameDto, UpdateUserNameResponseDto } from "./AppDtos";
import ApiClient, { ApiClientRequestOptions } from "./ApiClient";

const Login = (request: LoginRequestDto, options?: ApiClientRequestOptions): Promise<LoginResponseDto> =>
  ApiClient.invokeMethod<LoginResponseDto>("Api", "AuthManager", "Login", request, options);

const SignUp = (request: SignUpRequestDto, options?: ApiClientRequestOptions): Promise<SignUpResponseDto> =>
  ApiClient.invokeMethod<SignUpResponseDto>("Api", "AuthManager", "SignUp", request, options);

const SendPasswordResetEmail = (request: SendPasswordResetRequestDto, options?: ApiClientRequestOptions): Promise<OperationResultDto> =>
  ApiClient.invokeMethod<OperationResultDto>("Api", "AuthManager", "SendPasswordResetEmail", request, options);

const GetSession = (request: GetSessionRequestDto, options?: ApiClientRequestOptions): Promise<SessionDto> =>
  ApiClient.invokeMethod<SessionDto>("Api", "AuthManager", "GetSession", request, options);

const ChangePassword = (request: ChangePasswordRequestDto, options?: ApiClientRequestOptions): Promise<OperationResultDto> =>
  ApiClient.invokeMethod<OperationResultDto>("Api", "AuthManager", "ChangePassword", request, options);

const UpdateUserEmail = (request: UpdateUserEmailDto, options?: ApiClientRequestOptions): Promise<UpdateUserEmailResponseDto> =>
  ApiClient.invokeMethod<UpdateUserEmailResponseDto>("Api", "AuthManager", "UpdateUserEmail", request, options);

const UpdateUserPassword = (request: UpdateUserPasswordDto, options?: ApiClientRequestOptions): Promise<UpdateUserPasswordResponseDto> =>
  ApiClient.invokeMethod<UpdateUserPasswordResponseDto>("Api", "AuthManager", "UpdateUserPassword", request, options);

const UpdateUserName = (request: UpdateUserNameDto, options?: ApiClientRequestOptions): Promise<UpdateUserNameResponseDto> =>
  ApiClient.invokeMethod<UpdateUserNameResponseDto>("Api", "AuthManager", "UpdateUserName", request, options);

export default {
  Login,
  SignUp,
  SendPasswordResetEmail,
  GetSession,
  ChangePassword,
  UpdateUserEmail,
  UpdateUserPassword,
  UpdateUserName
};
