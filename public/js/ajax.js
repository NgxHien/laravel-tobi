/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/ajax.js":
/*!******************************!*\
  !*** ./resources/js/ajax.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
var btnBanner = document.getElementById('btn-banner');
var btnSummary = document.getElementById('btn-summary');
var btnDescription = document.getElementById('btn-description');
var btnProgress = document.getElementById('btn-progress');
var btnOutcome = document.getElementById('btn-outcome');
var btnImpact = document.getElementById('btn-impact');
btnBanner.addEventListener('click', updateBanner);
btnSummary.addEventListener('click', updateSummary);
btnDescription.addEventListener('click', updateDescription);
btnProgress.addEventListener('click', updateProgress);
btnOutcome.addEventListener('click', updateOutcome);
btnImpact.addEventListener('click', updateImpact);
var ajaxSuccess = document.getElementById("success-ajax");
var ajaxError = document.getElementById("error-ajax");
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': token
  }
});

function activeLoading(id) {
  var btn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var loading = document.getElementById(id);

  if (loading) {
    loading.classList.remove('hidden');
  }

  if (btn) {
    btn.disabled = true;
  }
}

function disableLoading(id) {
  var btn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var loading = document.getElementById(id);

  if (loading) {
    loading.classList.add('hidden');
  }

  if (btn) {
    btn.disabled = false;
  }
}

function updateBanner() {
  activeLoading('loading-banner');
  var url = document.getElementById('banner-url').dataset.url;
  var title = document.getElementById('title-banner').innerText;
  var content = document.getElementById('banner-description-content').innerText;
  $.ajax({
    type: "PUT",
    url: url,
    data: {
      title: title,
      description: {
        content: content
      }
    },
    cache: false,
    success: function success(data) {
      disableLoading('loading-banner', btnBanner);
      animate(ajaxSuccess);
    },
    error: function error(res) {
      disableLoading('loading-banner', btnBanner);
      animate(ajaxSuccess);
    }
  });
}

function updateSummary() {
  activeLoading('loading-summary');
  var url = document.getElementById('summary-url').dataset.url;
  var content = document.getElementById('summary-description-content').innerText;
  $.ajax({
    type: "PUT",
    url: url,
    data: {
      content: content
    },
    cache: false,
    success: function success(data) {
      disableLoading('loading-summary', btnBanner);
      animate(ajaxSuccess);
    },
    error: function error(res) {
      disableLoading('loading-summary', btnBanner);
      animate(ajaxSuccess);
    }
  });
}

function mapNodeList(nodeList) {
  return Array.from(nodeList).map(function (item) {
    return item.innerText;
  });
}

function updateDescription() {
  activeLoading('loading-description');
  var url = document.getElementById('description-url').dataset.url;
  var titleCard0 = document.getElementById('description-card-0').innerText;
  var titleCard1 = document.getElementById('description-card-1').innerText;
  var titleCard2 = document.getElementById('description-card-2').innerText;
  var titleCard3 = document.getElementById('description-card-3').innerText;
  var content0 = mapNodeList(document.querySelectorAll('.description-card-content-0'));
  var content1 = mapNodeList(document.querySelectorAll('.description-card-content-1'));
  var content2 = mapNodeList(document.querySelectorAll('.description-card-content-2'));
  var content3 = mapNodeList(document.querySelectorAll('.description-card-content-3'));
  $.ajax({
    type: "PUT",
    url: url,
    data: {
      card: [{
        title: titleCard0,
        values: content0
      }, {
        title: titleCard1,
        values: content1
      }, {
        title: titleCard2,
        values: content2
      }, {
        title: titleCard3,
        values: content3
      }]
    },
    cache: false,
    success: function success(data) {
      disableLoading('loading-description', btnDescription);
      animate(ajaxSuccess);
    },
    error: function error(res) {
      disableLoading('loading-description', btnDescription);
      animate(ajaxError);
    }
  });
}

function updateProgress() {
  activeLoading('loading-progress');
  var url = document.getElementById('progress-url').dataset.url;
  var titleCards = mapNodeList(document.querySelectorAll('.progress-card-title'));
  var noteCards = mapNodeList(document.querySelectorAll('.progress-card-note'));
  var contents = mapNodeList(document.querySelectorAll('.progress-card-content'));
  dataAjax = titleCards.map(function (current, index) {
    return {
      title: current,
      note: noteCards[index],
      content: contents[index]
    };
  });
  $.ajax({
    type: "PUT",
    url: url,
    data: {
      card: dataAjax
    },
    cache: false,
    success: function success(data) {
      disableLoading('loading-progress', btnProgress);
      animate(ajaxSuccess);
    },
    error: function error(res) {
      disableLoading('loading-progress', btnProgress);
      animate(ajaxError);
    }
  });
}

function updateOutcome() {
  activeLoading('loading-outcome');
  var url = document.getElementById('outcome-url').dataset.url;
  var titleCards = mapNodeList(document.querySelectorAll('.outcome-card-title'));
  var content0 = mapNodeList(document.querySelectorAll('.outcome-card-content-0'));
  var content1 = mapNodeList(document.querySelectorAll('.outcome-card-content-1'));
  var content2 = mapNodeList(document.querySelectorAll('.outcome-card-content-2'));
  var contents = [];
  contents.push(content0, content1, content2);
  var dataAjax = titleCards.map(function (current, index) {
    return {
      title: current,
      content: contents[index]
    };
  });
  $.ajax({
    type: "PUT",
    url: url,
    data: {
      card: dataAjax
    },
    cache: false,
    success: function success(data) {
      disableLoading('loading-outcome', btnOutcome);
      animate(ajaxSuccess);
    },
    error: function error(res) {
      disableLoading('loading-outcome', btnOutcome);
      animate(ajaxError);
    }
  });
}

function updateImpact() {
  activeLoading('loading-impact');
  var url = document.getElementById('impact-url').dataset.url;
  var contentSection = document.getElementById('impact-description-content').innerText;
  var title = mapNodeList(document.querySelectorAll('.impact-card-title'));
  var contents = mapNodeList(document.querySelectorAll('.impact-card-content'));
  var ajaxCard = title.map(function (current, index) {
    return {
      title: current,
      content: contents[index]
    };
  });
  $.ajax({
    type: "PUT",
    url: url,
    data: {
      content: contentSection,
      card: ajaxCard
    },
    cache: false,
    success: function success(data) {
      disableLoading('loading-impact', btnImpact);
      animate(ajaxSuccess);
    },
    error: function error(res) {
      disableLoading('loading-impact', btnImpact);
      animate(ajaxError);
    }
  });
}

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/ajax.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\hades\dev\laravel-tobi\resources\js\ajax.js */"./resources/js/ajax.js");


/***/ })

/******/ });