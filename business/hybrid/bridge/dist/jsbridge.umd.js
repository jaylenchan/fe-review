!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.jsbridge=e()}(this,function(){var t=Object.prototype.toString;function e(e){return function(o){return t.call(o)==="[object "+e+"]"}}var o=e("Function"),i=e("Array"),r=e("String"),n=function(){},a=1,s=function(){return a++},c=function(t,e){void 0===e&&(e=1);var o=function(t){var e=[],o=t.toLowerCase();if(!/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(o))return[255,255,255];if(4===o.length){for(var i="#",r=1;r<4;r+=1){var n=o[r];i+=""+n+n}o=i}for(r=1;r<7;r+=2)e.push(parseInt("0x"+o.slice(r,r+2)));return e}(t);return{red:o[0],green:o[1],blue:o[2],alpha:Math.floor(255*e)}},u=function(t){void 0===t&&(t={});var e=t.context;void 0===e&&(e=window);var o=t.debug;void 0===o&&(o=!1);var i=t.debugHandler;void 0===i&&(i=console.log),this.hookMap={},this.debug=o,this.debugHandler=o?i.bind(this):n,e.bridgeClass||(e.bridgeClass=this)};return u.prototype.call=function(t){var e=document.createElement("iframe");e.setAttribute("style","display:none;width:0;height:0;border:none;"),e.setAttribute("src",t),document.body.appendChild(e),setTimeout(function(){document.body.removeChild(e)},100)},u.prototype.extend=function(t){for(var e in t){var i=t[e];this[e]=o(i)?i.bind(this):i}},u.prototype.emit=function(t,e){if(r(e)||(e=JSON.stringify(e)),window.jscomm)this.debugHandler("debug[Android][toLocalEvent]",t,e),window.jscomm.toLocalEvent(t,e);else{var o="ekwing:abc?"+JSON.stringify({event:t,params:e});this.debugHandler("debug[IOS][toLocalEvent]",o),this.call(o)}},u.prototype.register=function(t,e){var o=t+"-"+s();return this.hookMap[o]=function(t){return function(e){return t(e)}}(e),o},u.prototype.registerSync=function(t,e,o){void 0===o&&(o=!0);var i=o?t+"-"+s():t;return this.hookMap[i]=e.bind(this),i},u.prototype.registerHook=function(t,e){var o=this;this.hookMap[t]=this.hookMap[t]||[];var i=e.bind(this);return this.hookMap[t].push(i),function(){o.hookMap[t]=o.hookMap[t].filter(function(t){return t!==i})}},u.prototype.toJsEvent=function(t,e){var r=this.hookMap[t];if(!r){var n=new Error("hook["+t+"] is undefined");return this.debugHandler(n),!1}e=function(t){var e;try{e=JSON.parse(t)}catch(o){e=t}return e}(e),o(r)?(r(e),delete this.hookMap[t]):i(r)&&r.forEach(function(t){return t(e)}),this.debugHandler("debug["+t+"][response]",e)},u.prototype.request=function(t){var e=this,o=t.type,i=t.url,r=t.data;return new Promise(function(t,n){e.emit("proxy",{type:o,url:i,data:r,success:e.register("proxy",t),fail:e.register("proxy",n)})})},u.prototype.push=function(t){var e=t.titleBarVisible;void 0===e&&(e=!1);var o=t.statusBarColor,i=t.statusBarOpacity;void 0===i&&(i=1);var r=t.retain;void 0===r&&(r=!0);var a=t.animation;void 0===a&&(a="none");var s=t.fullScreen;void 0===s&&(s=!1);var u=t.isPortrait;void 0===u&&(u=!1);var d=t.callback;void 0===d&&(d=n);var p=t.refresh;void 0===p&&(p=!1);var l=t.afterRefresh;void 0===l&&(l=n);var h={url:t.url,localTitleBar:e,title:t.title,titleBarHeight:t.titleBarHeight,data:t.data,intentData:t.intentData,retain:r,anim:a,fullScreen:s,isPortrait:u,callBack:this.registerSync("openView",d),needRefresh:p,refreshCallBack:this.registerSync("openViewRefresh",l)};o&&(h.naviBarColor=c(o,i)),this.emit("openView",h)},u.prototype.changeViewData=function(t){this.emit("changeOpenViewData",{url:t.url,data:t.data})},u.prototype.back=function(){this.emit("goback")},u.prototype.playAudio=function(t){var e=t.action;void 0===e&&(e="play");var o=t.src,i=t.newPlayer;void 0===i&&(i=!0);var r=t.pauseOthers;void 0===r&&(r=!0);var a=t.seekTime,c=t.needDetails;void 0===c&&(c=!1);var u=t.loop;void 0===u&&(u=!1);var d=t.playLocalFile;void 0===d&&(d=!1);var p=t.callback;void 0===p&&(p=n);var l="playAudio-"+s();this.registerHook(l,p),this.emit("playAudio",{run:e,src:o,callBack:l,newPlayer:i,pauseOthers:r,seekTime:a,needDetails:c,loop:u,playLocalFile:d})},u.prototype.getAudio=function(t){var e=this;return new Promise(function(o){e.emit("playStatus",{src:t,callBack:e.register("playStatus",o)})})},u.prototype.fetchAudio=function(t){var e=this,o=t.urls,i=t.callback,r="fetchLocalAudioSrc",n=r+"-"+s();return new Promise(function(t,a){e.registerHook(n,function(e){var o=e.loadingFailed,r=e.loadingProgress,n=e.localAudioSrcArr;return o?a({status:1}):r<=100?(i(r),void(100==r&&!o&&n&&t(n))):void a({status:2})}),e.emit(r,{oriAudioSrcArr:o,callBack:n})})},u.prototype.playVideo=function(t){this.emit("localVideoPlay",{id:t.id,dubbingId:t.dubbingId,type:t.type,compoundAudio:t.compoundAudio,compoundVideo:t.compoundVideo,video:t.video,videoBg:t.videoBgm,videoImg:t.videoCover,sentence:t.sentence})},u.prototype.getSystemInfo=function(t){var e=this;return new Promise(function(o){e.emit("getSysInfo",{request:t,callBack:e.register("getSysInfo",o)})})},u.prototype.getCache=function(t){var e=this;return new Promise(function(o){e.emit("getLocalCache",{key:t,callBack:e.register("getLocalCache",o)})})},u.prototype.setCache=function(t,e,o){this.emit("setLocalCache",{key:t,value:e,cover:o.cover,persistent:o.persistent})},u.prototype.setStatusBarColor=function(t,e){void 0===e&&(e=1);var o=c(t,e);this.emit("setNaviBar",o)},u.prototype.log=function(t,e){void 0===e&&(e={}),this.emit("statisticalEvent",{event:t,maps:e})},u.prototype.removeHistory=function(t){this.emit("removeHistory",t)},u.prototype.showTimePicker=function(t){var e=this,o=t.timeStamp;void 0===o&&(o=(new Date).valueOf());var i=t.minTime,r=t.maxTime,n=t.step;void 0===n&&(n=1);var a=t.showMinute;return void 0===a&&(a=!0),new Promise(function(t){e.emit("dtPicker",{timeStamp:o,minTime:i,maxTime:r,minuStep:n,minuIsShow:a,callBack:e.register("dtPicker",t)})})},u.prototype.showVipModal=function(){this.emit("vipPop")},u.prototype.share=function(t){var e=this,o=t.type,i=t.title,r=t.url,n=t.imageURL,a=t.description;return new Promise(function(t){e.emit("sharePage",{type:o,title:i,url:r,imageURL:n,description:a,callBack:e.register("sharePage",t)})})},u.prototype.showVisitorModal=function(){this.emit("visitor_pop")},u.prototype.getPhoneInfo=function(t){var e=this;return new Promise(function(o){e.emit("queryLocation",{number:t,callBack:e.register("queryLocation",o)})})},u.prototype.showAddressBook=function(){var t=this;return new Promise(function(e){t.emit("addressBook",{callBack:t.register("addressBook",e)})})},u.prototype.loginFailed=function(t){this.emit("ek_login_failed",t)},u.prototype.afterPageHide=function(t){return this.registerHook("jsPageHide",t)},u.prototype.afterPageShow=function(t){return this.registerHook("jsPageShow",t)},u.prototype.beforeBack=function(t){return this.registerHook("goback",t)},u.prototype.afterBack=function(t){return this.registerHook("gobackCB",t)},new u});
//# sourceMappingURL=jsbridge.umd.js.map
