"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[841],{47841:function(e,t,o){o.r(t),o.d(t,{detectProvider:function(){return r}});const r=(e={})=>{const{providerName:t="ethereum",eventName:o="ethereum#initialized",detectInterval:r=50,timeout:n=3e3,silent:i=!1}=e;function d(){const e=window[t];return"function"===typeof e?.request?e:void 0}(()=>{if("string"!==typeof t)throw new Error("@web3-wallet/detect-provider: Expected option 'providerName' to be a string.");if("string"!==typeof o)throw new Error("@web3-wallet/detect-provider: Expected option 'eventName' to be a string.");if("number"!==typeof r)throw new Error("@web3-wallet/detect-provider: Expected option 'detectInterval' to be a number.");if(r<20||r>1e3)throw new Error(`@web3-wallet/detect-provider: Expected option 'detectInterval' to be '20 < detectInterval < 1000', got ${r}`);if("boolean"!==typeof i)throw new Error("@web3-wallet/detect-provider: Expected option 'silent' to be a boolean.");if("number"!==typeof n)throw new Error("@web3-wallet/detect-provider: Expected option 'timeout' to be a number.")})();let w=!1;return new Promise((e=>{if("undefined"===typeof window)return void e(void 0);if(d())return void e(d());const c=()=>{if(w)return;w=!0,window.removeEventListener(o,c);const r=d();if(r)return void e(r);const n=`Unable to detect window.${t}.`;!i&&console.error("@web3-wallet/detect-provider:",n),e(void 0)};window.addEventListener(o,c,{once:!0});const a=setTimeout((()=>{c()}),n),p=async()=>{if(w)return;var t;await(t=r,new Promise((e=>{setTimeout((()=>{e()}),t)})));const o=d();if(o)return clearTimeout(a),void e(o);p()};p()}))}}}]);