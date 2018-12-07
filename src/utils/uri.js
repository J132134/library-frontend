import { stringify } from 'qs';
import { snakelize } from './snakelize';

export const makeURI = (pathname, query, baseHost = null) => {
  const _query = snakelize(query);
  const path = `${pathname}?${stringify(_query, { skipNulls: true })}`;

  if (baseHost) {
    return `${baseHost}${path}`;
  }

  return path;
};

export const convertUriToAndroidIntentUri = (uri, packageName) => {
  // 앱 호출 URI를 안드로이드 intent를 이용해 호출할 수 있는 URI로 변환해주는 함수
  const scheme = /(.+):\/\//.exec(uri)[1];

  /* 줄바꿈시 공백이 들어가서 다운로드 URI 오류 발생 */
  return `${uri.replace(
    `${scheme}://`,
    'intent://',
  )}#Intent;scheme=${scheme};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=${packageName};end`;
};

export const makeLoginURI = (authorizeURI, clientId, redirectURI) =>
  `${authorizeURI}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}`;
