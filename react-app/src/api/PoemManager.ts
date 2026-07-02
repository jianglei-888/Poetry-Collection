import { GetFeaturedPoemsRequestDto, FeaturedPoemListDto, GetPoemDetailRequestDto, PoemDetailDto } from "./AppDtos";
import ApiClient, { ApiClientRequestOptions } from "./ApiClient";

const GetFeaturedPoems = (request: GetFeaturedPoemsRequestDto, options?: ApiClientRequestOptions): Promise<FeaturedPoemListDto> =>
  ApiClient.invokeMethod<FeaturedPoemListDto>("Api", "PoemManager", "GetFeaturedPoems", request, options);

const GetPoemDetail = (request: GetPoemDetailRequestDto, options?: ApiClientRequestOptions): Promise<PoemDetailDto | null> =>
  ApiClient.invokeMethod<PoemDetailDto | null>("Api", "PoemManager", "GetPoemDetail", request, options);

export default {
  GetFeaturedPoems,
  GetPoemDetail
};
