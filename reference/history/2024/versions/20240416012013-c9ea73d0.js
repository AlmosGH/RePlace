/* Legacy global scratch slots: the renderer overwrites each slot before every live read. Preserve the declarations while removing their former obfuscator initializer. */
var imageColumnOffset;
$(
  /**
   * Direct network calls: GET /api/get-painting.php?id= <dynamic suffix>.
   *
   * Observed DOM operations: remove, append.
   *
   * Scheduled work: setInterval (5000 ms).
   */
  function () {
    var clientVersion = 7,
      paintingReloadInterval = null;
    /* The protocol mixes this restricted alphabet with the alphanumeric alphabet when building request tokens. */
    function randomCacheToken(length) {
      var characters = [],
        alphabet = 'gmbonjklezcfxta1234567890GMBONJKLEZCFXTA',
        alphabetLength = alphabet.length;
      for (var characterIndex = 0; characterIndex < length; characterIndex++) {
        characters.push(alphabet.charAt(Math.floor(Math.random() * alphabetLength)));
      }
      return characters.join('');
    }
    function randomHolidayEmoji() {
      var emojiIndex = Math.floor(Math.random() * 30);
      if (emojiIndex === 0) return '⛄';
      else if (emojiIndex === 1) return '❄';
      else if (emojiIndex === 2) return '🎁';
      else if (emojiIndex === 3) return '🎄';
      else if (emojiIndex === 4) return '🌟';
      else if (emojiIndex === 5) {
        return '🦌';
      } else if (emojiIndex === 6) return '🎅';
      else return emojiIndex === 30 ? '🕯️' : '';
    }
    function randomAlphanumericString(length) {
      var characters = [],
        alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        alphabetLength = alphabet.length;
      for (var characterIndex = 0; characterIndex < length; characterIndex++) {
        characters.push(alphabet.charAt(Math.floor(Math.random() * alphabetLength)));
      }
      return characters.join('');
    }
    /* UI animation and placement cooldowns use milliseconds; server timestamps elsewhere use seconds. */
    function nowMilliseconds() {
      return new Date().getTime();
    }
    /* Convert the browser clock to the integer-second timestamps expected by the existing protocol. */
    function nowSeconds() {
      return parseInt(new Date().getTime() / 1000);
    }
    function roundToDecimals(number, decimals) {
      var precisionMultiplier = Math.pow(10, decimals || 0);
      return Math.round(number * precisionMultiplier) / precisionMultiplier;
    }
    function randomIntegerInclusive(minimum, maximum) {
      return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
    }
    /* Coordinate modal state, form content, toolbar preferences, and the settings persisted by the original client. */
    var sessionStartedAt = nowSeconds(),
      ui = null,
      selectedItemId = null,
      timestamp = 0,
      setIntervalResult = null,
      selectedPriceId = 2,
      enabled = false,
      count = 0;
    /**
     * Observed DOM operations: remove, html, lastNotification.removeClass, lastNotification.addClass, elements.notification.append, text, hide.
     *
     * Scheduled work: setTimeout (500 ms).
     *
     * Input bindings: type, title, description, allowDuplicates, clearExisting. Names describe inferred roles; protocol field names are preserved separately.
     */
    /* Suppress identical consecutive notices unless explicitly allowed; dismissal and visual effects are scheduled separately. */
    function showNotification(type, title, description, allowDuplicates, clearExisting) {
      clearExisting && $('#notification .box').remove();
      var shouldAppend = true;
      if (allowDuplicates !== true) {
        var lastNotification = elements.notification.find('.box').last();
        if (
          lastNotification.find('.title').html() == title &&
          lastNotification.find('.description').html() == description
        ) {
          lastNotification.removeClass('pulse-border');
          lastNotification.addClass('pulse-border');
          setTimeout(
            /**
             * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
             *
             * Observed DOM operations: lastNotification.removeClass.
             */
            function () {
              lastNotification.removeClass('pulse-border');
            },
            500
          );
          shouldAppend = false;
          return;
        }
      }
      if (shouldAppend) {
        var notification = $(
          '<div class="box ' +
            type +
            '"><div class="icon"></div><div class="content"><div class="title"></div><div class="description"></div></div></div>'
        );
        elements.notification.append(notification);
        notification.find('.title').text(title);
        !description
          ? notification.find('.description').hide()
          : notification.find('.description').text(description);
        scheduleNotificationDismissal(notification);
      }
    }
    /* Leave the notification visible for six seconds before starting its fade-out animation. */
    function scheduleNotificationDismissal(notification) {
      setTimeout(
        /**
         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
         *
         * Observed DOM operations: text, html.
         */
        function () {
          var title = notification.find('.title').text();
          notification.find('.title').html(title + '<span></span>');
          notification.fadeOut(
            500,
            /**
             * Observed DOM operations: remove.
             *
             * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
             */
            function () {
              $(this).remove();
            }
          );
        },
        6000
      );
    }
    $(document).on(
      'click',
      '#notification .box',
      /**
       * Registered click callback delegated to "#notification .box". It reads the current shared state when the event arrives; registration does not execute the callback body.
       *
       * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
       */
      function () {
        $(this).fadeOut(
          500,
          /**
           * Observed DOM operations: remove.
           *
           * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
           */
          function () {
            $(this).remove();
          }
        );
      }
    );
    var trackedUsername = null,
      trackingExpiresAt = 0,
      digitLetterTable = {};
    digitLetterTable['0'] = 'g';
    digitLetterTable['1'] = 'n';
    digitLetterTable['2'] = 'b';
    digitLetterTable['3'] = 'r';
    digitLetterTable['4'] = 'z';
    digitLetterTable['5'] = 's';
    digitLetterTable['6'] = 'l';
    digitLetterTable['7'] = 'x';
    digitLetterTable['8'] = 'i';
    digitLetterTable['9'] = 'o';
    var digitLetters = digitLetterTable;
    function holidayTextHtml(text) {
      var characters = text.split(''),
        styleRange = {};
      styleRange.min = 1;
      styleRange.max = 4;
      var styleBounds = styleRange,
        styleSpan = styleBounds.max - styleBounds.min,
        styleIndex = Math.round(styleBounds.min + Math.random() * styleSpan),
        html = '<span class="xmas">';
      for (var key in characters) {
        if (styleIndex === 1) {
          html += '<span class="a">' + characters[key] + '</span>';
        } else if (styleIndex === 2) html += '<span class="b">' + characters[key] + '</span>';
        else if (styleIndex === 3) {
          html += '<span class="c">' + characters[key] + '</span>';
        } else if (styleIndex === 4) {
          html += '<span class="d">' + characters[key] + '</span>';
          styleIndex = 0;
        }
        styleIndex++;
      }
      return ((html += '</span>'), html);
    }
    var openGoldShop = function () {},
      cacheToken = '';
    /* Central HTTP wrapper: track pending requests, optionally cancel a previous matching request, construct protocol headers, and dispatch server responses. */
    const api = {
      xhr: {
        requests: {},
        abortRequest: function (requestId) {
          api.xhr.requests[requestId] !== undefined && api.xhr.requests[requestId].abort();
        },
        removeRequest: function (requestId) {
          api.xhr.requests[requestId] !== undefined && delete api.xhr.requests[requestId];
        },
        /**
         * HTTP request boundary. The pending-request key combines the method and URL; cancelling a matching request is optional and is not a statement about HTTP caching. The wrapper builds the original protocol headers and translates transport outcomes into the existing success flag/response callback. Error branches can instead redirect, open a modal, or display a notice; callers must preserve those distinctions.
         *
         * Shared/receiver state written: cacheToken, api.xhr.requests[computed].
         *
         * Input bindings: method, url, data, cancelPrevious, callback, skipCacheToken. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* The fourth argument cancels an older request with the same method/URL. CACHE-L0CAL is an existing protocol header, not an HTTP cache directive. */
        req: function (method, url, data, cancelPrevious, callback, skipCacheToken) {
          var requestKey = method + '-' + url;
          if (cancelPrevious) {
            api.xhr.abortRequest(requestKey);
          }
          var requestHeaders = {};
          if (!skipCacheToken) {
            var tokenDigitTable = {};
            tokenDigitTable['0'] = 'w';
            tokenDigitTable['1'] = 's';
            tokenDigitTable['2'] = 'k';
            tokenDigitTable['3'] = 'h';
            tokenDigitTable['4'] = 'r';
            tokenDigitTable['5'] = 'y';
            tokenDigitTable['6'] = 'i';
            tokenDigitTable['7'] = 'c';
            tokenDigitTable['8'] = 'a';
            tokenDigitTable['9'] = 'm';
            var digitEncoding = tokenDigitTable,
              timestamp = nowSeconds() + 258,
              text = timestamp + '',
              timestampDigits = text.split('');
            cacheToken = '';
            for (var digitIndex in timestampDigits) {
              if (digitIndex == 0) {
                cacheToken += randomAlphanumericString(3);
              }
              if (digitIndex == 1) {
                cacheToken += randomAlphanumericString(2);
              }
              if (digitIndex == 2) {
                cacheToken += randomCacheToken(3);
              }
              digitIndex == 3 && (cacheToken += randomAlphanumericString(4));
              if (digitIndex == 4) {
                cacheToken += randomCacheToken(3);
              }
              if (digitIndex == 5) {
                cacheToken += randomAlphanumericString(2);
              }
              digitIndex == 6 && (cacheToken += randomAlphanumericString(4));
              if (digitIndex == 7) {
                cacheToken += randomCacheToken(2);
              }
              digitIndex == 8 && (cacheToken += randomAlphanumericString(3));
              if (digitIndex == 9) {
                cacheToken += randomAlphanumericString(4);
              }
              if (Math.floor(Math.random() * 2) === 0)
                cacheToken += digitEncoding[parseInt(timestampDigits[digitIndex])].toUpperCase();
              else {
                cacheToken += digitEncoding[parseInt(timestampDigits[digitIndex])];
              }
              cacheToken += timestampDigits[digitIndex];
            }
            cacheToken = cacheToken + '=';
            requestHeaders['CACHE-L0CAL'] = cacheToken;
          }
          api.xhr.requests[requestKey] = $.ajax({
            url: url,
            type: method,
            data: data,
            dataType: 'json',
            headers: requestHeaders,
            success: function (response) {
              api.xhr.removeRequest(requestKey);
              callback(true, response);
            },
            /**
             * Observed DOM operations: hide.
             *
             * Scheduled work: setTimeout (500 ms).
             *
             * Input bindings: xhr. Names describe inferred roles; protocol field names are preserved separately.
             */
            error: function (xhr) {
              api.xhr.removeRequest(requestKey);
              if (xhr.status !== undefined && (xhr.status === 0 || xhr.status === '0')) {
              } else if (xhr.responseJSON !== undefined) {
                if (xhr.responseJSON.action !== undefined && xhr.responseJSON.action === 'username') {
                  ui.closeModal();
                  ui.openModal('username', 'username');
                  showNotification('error', 'Error', xhr.responseJSON.message);
                } else if (xhr.responseJSON.action !== undefined && xhr.responseJSON.action === 'login') {
                  ui.closeModal();
                  $('#item').hide();
                  $('#profile').hide();
                  $('#onlineUsers').hide();
                  $('#guild').hide();
                  ui.openModal('auth', 'login');
                  showNotification('error', 'Error', xhr.responseJSON.message);
                } else if (xhr.responseJSON.action !== undefined && xhr.responseJSON.action === 'shop') {
                  ui.closeModal();
                  $('#item').hide();
                  $('#profile').hide();
                  $('#onlineUsers').hide();
                  $('#guild').hide();
                  ui.openModal('main', 'shop');
                  setTimeout(
                    /**
                     * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                     *
                     * Shared/receiver state written: ui.activeContent[computed].scrollTop.
                     */
                    function () {
                      ui.activeContent[0].scrollTop = ui.activeContent[0].scrollHeight;
                    },
                    500
                  );
                  showNotification('error', 'Error', xhr.responseJSON.message);
                } else if (
                  xhr.responseJSON.action !== undefined &&
                  xhr.responseJSON.action === 'gold-island'
                ) {
                  openGoldShop();
                  showNotification('error', 'Error', xhr.responseJSON.message);
                } else callback(false, xhr.responseJSON);
              } else if (xhr.responseText !== undefined) {
                var messageData = {};
                messageData.message = xhr.responseText;
                callback(false, messageData);
              } else if (xhr.statusText !== undefined && xhr.statusText != 'abort') {
                var statusError = {};
                statusError.message = 'Server internal error (' + xhr.statusText + ')';
                callback(false, statusError);
              } else {
                var serverError = {};
                serverError.message = 'Server internal error';
                callback(false, serverError);
              }
            }
          });
        }
      }
    };
    /* The order array controls presentation; color indices remain unchanged because the server and stored pixels use them. */
    var defaultPalette = {};
    defaultPalette.order = [
      0, 1, 2, 3, 4, 5, 39, 6, 49, 40, 7, 8, 9, 10, 41, 11, 12, 13, 14, 42, 21, 20, 43, 44, 19, 18, 23, 15,
      17, 16, 22, 24, 25, 26, 27, 45, 28, 29, 46, 31, 30, 32, 33, 47, 34, 35, 36, 37, 38, 48
    ];
    defaultPalette.colors = [
      '#FFFFFF',
      '#C4C4C4',
      '#888888',
      '#555555',
      '#222222',
      '#000000',
      '#006600',
      '#22B14C',
      '#02BE01',
      '#51E119',
      '#94E044',
      '#FBFF5B',
      '#E5D900',
      '#E6BE0C',
      '#E59500',
      '#A06A42',
      '#99530D',
      '#633C1F',
      '#6B0000',
      '#9F0000',
      '#E50000',
      '#FF3904',
      '#BB4F00',
      '#FF755F',
      '#FFC49F',
      '#FFDFCC',
      '#FFA7D1',
      '#CF6EE4',
      '#EC08EC',
      '#820080',
      '#5100FF',
      '#020763',
      '#0000EA',
      '#044BFF',
      '#6583CF',
      '#36BAFF',
      '#0083C7',
      '#00D3DD',
      '#45FFC8',
      '#003638',
      '#477050',
      '#98FB98',
      '#FF7000',
      '#CE2939',
      '#FF416A',
      '#7D26CD',
      '#330077',
      '#005BA1',
      '#B5E8EE',
      '#1B7400'
    ];
    defaultPalette.premium = [];
    var defaultPainting = {};
    defaultPainting.autoAcceptTime = 0;
    defaultPainting.width = 300;
    defaultPainting.height = 300;
    defaultPainting.cooldown = 0;
    defaultPainting.background = '#FFFFFF';
    defaultPainting.type = 1;
    defaultPainting.palette = defaultPalette;
    var initialAppState = {};
    initialAppState.started = false;
    initialAppState.page = '7-pixels-world-war';
    initialAppState.painting = defaultPainting;
    var appState = initialAppState,
      initialConnectionState = {};
    initialConnectionState.io = null;
    initialConnectionState.started = false;
    initialConnectionState.wsv = 2;
    initialConnectionState.canvas = false;
    initialConnectionState.pending = [];
    initialConnectionState.errors = {};
    initialConnectionState.ignoreRedirectRequest = false;
    initialConnectionState.wsa = 6;
    initialConnectionState.wsb = 5;
    /* Authoritative account, painting, permission, and shop data populated by the painting HTTP response. */
    /* Mutable realtime connection state shared by the handshake, placement, chat, and reconnect handlers. */
    var connection = initialConnectionState,
      serverData = null,
      userCacheDigit = 5,
      alternativeMobileDrawing = false;
    if (localStorage) {
      var mobileDrawingPreferenceTimestamp = localStorage.getItem('mobile-alt-drawing');
      if (mobileDrawingPreferenceTimestamp !== null) {
        mobileDrawingPreferenceTimestamp = parseInt(mobileDrawingPreferenceTimestamp);
        mobileDrawingPreferenceTimestamp > parseInt(new Date().getTime() / 1000) - 604800 &&
          (alternativeMobileDrawing = true);
      }
    }
    var initialElements = {};
    initialElements.container = $('#container');
    initialElements.menu = $('#menu-buttons');
    initialElements.palette = $('#palette-buttons');
    initialElements.paletteButtonUp = $('#more-colors-above');
    initialElements.paletteButtonDown = $('#more-colors-below');
    initialElements.cursor = $('#cursor');
    initialElements.placeholder = $('#placeholder');
    initialElements.placeholderMobile = $('#placeholderMobile');
    initialElements.coordinates = $('#coordinates');
    initialElements.loader = $('#loader');
    initialElements.ls = $('#ls');
    initialElements.loaderCanvas = $('#loader-canvas');
    initialElements.notification = $('#notification');
    initialElements.cooldown = $('#cooldown');
    initialElements.modals = $('#modals');
    initialElements.copyright = $('#copyright');
    /* Cached jQuery handles for the main UI surfaces; keep selectors unchanged to match the original page markup. */
    var elements = initialElements,
      imagePainter = {};
    /**
     * Initialization boundary for a server-selected painting. The response has already supplied the account, painting configuration, shop data and permission settings. This function constructs the shared renderer/UI objects before registering handlers that close over them. Later callbacks read those mutable objects, so moving handlers into independent modules would require preserving the same state and initialization order.
     *
     * Direct network calls: GET /api/get-painting-access.php?getPendingCount=true&id= <dynamic suffix>.
     *
     * Shared/receiver state written: serverData.painting.background, userCacheDigit, connection.wsb, ui, openGoldShop, imagePainter, imagePainter.premium, imagePainter.premium[computed] (plus 3 other observed operations).
     *
     * Observed DOM operations: show, hide, html, attr, text, addClass, removeClass, val (plus 3 other observed operations).
     *
     * Scheduled work: setInterval (1000 ms), setInterval (500 ms), setTimeout (100 ms).
     */
    /* Build the painting UI from the server response, then register input, chat, shop, and realtime handlers. Shared state stays inside this ready callback. */
    function initializePainting() {
      if ($('.sidebar-april').length) {
        if (serverData.user.connected) {
          $('.april-connected').show();
          $('.april-guest').hide();
          var userBadgesHtml = '';
          for (var itemKey in serverData.user.icons) {
            userBadgesHtml +=
              '<img src="/img/badges/' + serverData.user.icons[itemKey] + '.png" class="badge">';
          }
          if (serverData.user.guild != '') {
            $('.april-connected > div > a[data-id="guild"]').html('' + serverData.user.guild + '');
            $('.april-connected > div > a[data-id="guild"]').attr('data-tag', serverData.user.guild);
            $('.april-connected > div > .bull').show();
          } else {
            $('.april-connected > div > a[data-id="guild"]').text('');
            $('.april-connected > div > .bull').hide();
          }
          $('.april-connected .coins-infos span').text(
            serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
          );
          if (serverData.user.name === '') {
            $('.april-connected > div > a[data-id="username"]').text('Click to create your username');
            $('.april-connected > div > a[data-id="username"]').addClass('open-modal');
            $('.april-connected > div > a[data-id="username"]').attr('data-target', 'username');
            $('.april-connected > div > a[data-id="username"]').attr('data-content', 'username');
          } else {
            $('.april-connected > div > a[data-id="username"]').text(serverData.user.name);
            $('.april-connected > div > a[data-id="username"]').attr(
              'data-profile',
              serverData.user.name.toLowerCase()
            );
            $('.april-connected > div > a[data-id="username"]').removeClass('open-modal');
            var latestEffectExpiration = Math.max(
              parseInt(serverData.user.rainbowTime),
              parseInt(serverData.user.xmasTime),
              parseInt(serverData.user.halloweenTime)
            );
            if (
              latestEffectExpiration === parseInt(serverData.user.rainbowTime) &&
              parseInt(serverData.user.rainbowTime) > nowSeconds()
            )
              $('.april-connected > div > a[data-id="username"]').addClass('rainbowText');
            else if (
              latestEffectExpiration === parseInt(serverData.user.xmasTime) &&
              parseInt(serverData.user.xmasTime) > nowSeconds()
            ) {
              $('.april-connected > div > a[data-id="username"]').addClass('xmasText');
              $('.april-connected > div > a[data-id="username"]').html(holidayTextHtml(serverData.user.name));
            } else
              latestEffectExpiration === parseInt(serverData.user.halloweenTime) &&
              parseInt(serverData.user.halloweenTime) > nowSeconds()
                ? $('.april-connected > div > a[data-id="username"]').addClass('halloween')
                : $('.april-connected > div > a[data-id="username"]')
                    .removeClass('xmasText')
                    .removeClass('halloween');
          }
          $('.april-connected > div > span').html(userBadgesHtml);
        } else {
          $('.april-connected').hide();
          $('.april-guest').show();
        }
      }
      $('title').text(serverData.painting.name + ' - Create paintings and place pixels with your friends!');
      if (serverData.painting.background > appState.painting.length - 1) {
        serverData.painting.background = 0;
      }
      if (serverData.user.settings.painting.isOwner || serverData.user.isStaff) {
        $('a[data-id="painting-owner-tools"]').removeClass('display-none').show();
        $('.open-modal[data-id="painting-settings"][data-target="main"][data-content="painting"]')
          .removeClass('display-none')
          .show();
        var welcomeVisible = false;
        if (!serverData.user.settings.painting.isOwner) {
          for (var itemKey in serverData.painting.moderators) {
            if (serverData.painting.moderators[itemKey].id === serverData.user.id) {
              if (serverData.painting.moderators[itemKey].permissions.tools) {
                welcomeVisible = true;
              }
              break;
            }
          }
          if (!welcomeVisible) {
            $('#tools .radio').hide();
            $('a[data-id="painting-settings"]').hide();
            $('#tools > h1').text('Global Moderator Tools');
            $('#tools .checkbox-protection-bg').hide();
            $('#tools .radio [name="radio-protection-tool"][value="0"]').parent('.radio').show();
            $('#tools .radio [name="radio-protection-tool"][value="4"]').parent('.radio').show();
          }
        } else {
          $('#tools > h1').text('Painting Owner Tools');
        }
      } else if (serverData.painting.isAvatar) {
        $('a[data-id="painting-owner-tools"]').removeClass('display-none').show();
        $('.open-modal[data-id="painting-settings"][data-target="main"][data-content="painting"]')
          .removeClass('display-none')
          .show();
        $('#tools .radio').hide();
        $('a[data-id="painting-settings"]').hide();
        $('#tools > h1').text('Avatar Tools');
        $('#tools .checkbox-protection-bg').hide();
        $('#tools .radio [name="radio-protection-tool"][value="0"]').parent('.radio').show();
        $('#tools .radio [name="radio-protection-tool"][value="3"]').parent('.radio').show();
      }
      userCacheDigit = serverData.user.id + ''.split('');
      userCacheDigit = userCacheDigit[randomInteger(0, userCacheDigit.length - 1)] + '';
      serverData.user.guild !== ''
        ? ($('#chat .tabs a[data-id="guild"] .title').text('' + serverData.user.guild + ''),
          $('.guild-quit').show())
        : $('.guild-quit').hide();
      $('.paypal-from').find('input[name="custom"]').val(serverData.user.key);
      connection.wsb = parseInt(elements.ls.text());
      for (var itemKey in serverData.shop.itemsOrder) {
        let itemEntry = serverData.shop.items[serverData.shop.itemsOrder[itemKey]];
        itemKey = serverData.shop.itemsOrder[itemKey];
        var imageClass = 'pixelate';
        if (
          parseInt(itemKey) == 4 ||
          parseInt(itemKey) == 5 ||
          parseInt(itemKey) == 6 ||
          parseInt(itemKey) == 10 ||
          parseInt(itemKey) == 11 ||
          parseInt(itemKey) == 12
        ) {
          imageClass = '';
        }
        var imageExtension = 'png',
          text = '';
        (parseInt(itemKey) === 6 || parseInt(itemKey) === 10 || parseInt(itemKey) === 12) &&
          ((imageExtension = 'gif'), (text = 'bg-white'));
        var html =
          '<a href="#" class="prem-item open-item" data-item="' +
          itemKey +
          '" title="Click to get more information about this item">' +
          '<div class="title">' +
          itemEntry.name +
          '</div>' +
          '<div class="logo ' +
          text +
          '"><img src="/img/item-' +
          itemKey +
          '.' +
          imageExtension +
          '?v=4"  class="' +
          imageClass +
          '"></div>';
        parseInt(itemKey) === 13
          ? (html +=
              '<div class="btn buy-item"><span>' +
              itemEntry.price +
              '</span> x <div class="pp-coin-1 gb-r w-auto"><img src="/img/gold-bar.png?v=2" width="16"></div></div>' +
              '</a>')
          : (html +=
              '<div class="btn buy-item"><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div> <span>' +
              itemEntry.price +
              '</span></div>' +
              '</a>');
        if (itemEntry.admin && !serverData.user.isStaff) {
        } else if (!itemEntry.display) {
        } else {
          itemEntry.admin && $(html).css('border', '2px solid red');
          $('.shop-items-list').append(html);
        }
      }
      if (serverData.painting.type === 2) {
        var hasPendingPaintings = false;
        $('#submit-painting-moderator-add').hide();
        if (serverData.user.settings.painting.isOwner) {
          hasPendingPaintings = true;
          $('#submit-painting-moderator-add').show();
        } else {
          for (var itemKey in serverData.painting.moderators) {
            if (serverData.painting.moderators[itemKey].id === serverData.user.id) {
              if (serverData.painting.moderators[itemKey].permissions.tools) {
                $('a[data-id="painting-owner-tools"]').removeClass('display-none').show();
              }
              hasPendingPaintings = true;
              break;
            }
          }
        }
        hasPendingPaintings
          ? ($('.open-modal[data-target="painting"][data-content="pending"]')
              .removeClass('display-none')
              .show(),
            api.xhr.req(
              'GET',
              '/api/get-painting-access.php?getPendingCount=true&id=' + serverData.painting.id,
              {},
              true,
              /**
               * HTTP completion callback for /api/get-painting-access.php?getPendingCount=true&id=. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: notificationBubbleElement.text, notificationBubbleElement.show, notificationBubbleElement.hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  var notificationBubbleElement = $(
                      '.open-modal[data-target="painting"][data-content="pending"]'
                    ).find('.notification-bubble'),
                    text = response.total;
                  (text >= 99 || text == '99+') && (text = '99+');
                  notificationBubbleElement.text(text);
                  text > 0 || text == '99+'
                    ? notificationBubbleElement.show()
                    : notificationBubbleElement.hide();
                }
              }
            ))
          : $('.open-modal[data-target="painting"][data-content="pending"]')
              .removeClass('display-none')
              .hide();
      }
      var initialPosition = {};
      initialPosition.x = 0;
      initialPosition.y = 0;
      /* Translate between page and painting coordinates and update the desktop/mobile cursor overlays. */
      var pointer = {
        x: 0,
        y: 0,
        window: initialPosition,
        display: false,
        touchDevice: false,
        mobileBrushActivated: false,
        mobileFirstActivation: true,
        /**
         * Shared/receiver state written: pointer.display.
         *
         * Observed DOM operations: elements.placeholderMobile.show, elements.placeholder.show, elements.cursor.show, elements.coordinates.show, elements.cursor.hide, elements.coordinates.hide, elements.placeholder.hide, elements.cursor.css.
         *
         * Input bindings: visible, paletteIndex. Names describe inferred roles; protocol field names are preserved separately.
         */
        triggerCursor: function (visible, paletteIndex) {
          if (!pointer.display && visible !== undefined && visible === true) {
            pointer.display = true;
            pointer.touchDevice
              ? !alternativeMobileDrawing && elements.placeholderMobile.show()
              : (elements.placeholder.show(), elements.cursor.show());
            elements.coordinates.show();
          } else if (pointer.display && visible !== undefined && visible === false) {
            pointer.display = false;
            elements.cursor.hide();
            elements.coordinates.hide();
            if (pointer.touchDevice) {
            } else elements.placeholder.hide();
          }
          paletteIndex !== undefined &&
            elements.cursor.css('background-color', appState.painting.palette.colors[paletteIndex]);
        },
        /**
         * Convert page/screen coordinates into painting coordinates. The canvas rectangle supplies the current page offset; the current scale supplies the inverse zoom. The legacy branch accounts for the original browser-specific zoom behavior. Rounding and bounds checks are performed by callers in their original positions, rather than silently being moved into this transform.
         *
         * Input bindings: screenX, screenY. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* Invert the painting transform. The legacy zoom branch compensates for browsers whose rectangle coordinates already include zoom. */
        screenToPaintingSpace: function (screenX, screenY) {
          var bounds = canvasRenderer.element.canvas.painting[0].getBoundingClientRect(),
            position = {};
          position.x = 0;
          position.y = 0;
          var convertedPosition = position,
            count = 0,
            verticalOffset = 0;
          if (canvasRenderer.haveZoomRendering) {
            convertedPosition.x = screenX / canvasRenderer.scale - bounds.left + count;
            convertedPosition.y = screenY / canvasRenderer.scale - bounds.top + verticalOffset;
          } else {
            convertedPosition.x = (screenX - bounds.left) / canvasRenderer.scale + count;
            convertedPosition.y = (screenY - bounds.top) / canvasRenderer.scale + verticalOffset;
          }
          return convertedPosition;
        },
        /**
         * Convert painting positions into overlay/page positions using the existing scale and canvas rectangle. This is used by cursors and visual effects; it does not mutate the painting pixels. Keep it paired with the inverse transform when changing view logic.
         *
         * Input bindings: paintingX, paintingY. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* Apply the painting transform to position overlays in page space. */
        paintingToScreenSpace: function (paintingX, paintingY) {
          var bounds = canvasRenderer.element.canvas.painting[0].getBoundingClientRect(),
            position = {};
          position.x = paintingX * canvasRenderer.scale + bounds.left;
          position.y = paintingY * canvasRenderer.scale + bounds.top;
          var positionResult = position;
          return positionResult;
        },
        /**
         * Translate the current input into integer painting coordinates, apply the client bounds checks, and update coordinate state/display. Invalid positions keep the original null-coordinate behavior used by later placement guards.
         *
         * Shared/receiver state written: pointer.x, pointer.y.
         *
         * Observed DOM operations: elements.coordinates.text.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        setCursorCoords: function (event) {
          event = normalizePointerEvent(event);
          var paintingPosition = pointer.screenToPaintingSpace(event.pageX, event.pageY);
          paintingPosition.x |= 0;
          paintingPosition.y |= 0;
          paintingPosition.x < 0 ||
          paintingPosition.x > canvasRenderer.width - 1 ||
          paintingPosition.y < 0 ||
          paintingPosition.y > canvasRenderer.height - 1
            ? ((pointer.x = null), (pointer.y = null))
            : ((pointer.x = paintingPosition.x),
              (pointer.y = paintingPosition.y),
              elements.coordinates.text(pointer.x + ',' + pointer.y));
        },
        /**
         * Update cursor and placement previews using the current view and tool state. Desktop pointer placement and mobile-centered placement follow different branches. Weapon radius, brush size and rendering/zoom mode affect overlay dimensions, so the displayed cursor is not a direct statement about a server-accepted placement.
         *
         * Shared/receiver state written: pointer.x, pointer.y.
         *
         * Observed DOM operations: elements.placeholderMobile.css, elements.coordinates.text, elements.placeholder.css.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        setCursorPosition: function (event) {
          if (!canvasRenderer.loaded) return;
          else if (!alternativeMobileDrawing && pointer.touchDevice) {
            var innerWidth = Math.round(window.innerWidth / 2),
              innerHeight = Math.round(window.innerHeight / 2);
            if (selectedItemId)
              var radius = parseInt(serverData.shop.items[selectedItemId].radius),
                cursorWidth = parseInt(canvasRenderer.scale * radius) + 1,
                cursorHeight = parseInt(canvasRenderer.scale * radius) + 1;
            else {
              var cursorWidth = parseInt(canvasRenderer.scale * canvasRenderer.brush.size),
                cursorHeight = parseInt(canvasRenderer.scale * canvasRenderer.brush.size);
            }
            var position = {},
              bounds = canvasRenderer.element.canvas.painting[0].getBoundingClientRect();
            if (canvasRenderer.haveZoomRendering) {
              position.x = Math.round(innerWidth / canvasRenderer.scale - bounds.left - 2);
              position.y = Math.round(innerHeight / canvasRenderer.scale - bounds.top - 1);
            } else {
              position.x = Math.round((innerWidth - bounds.left) / canvasRenderer.scale - 1);
              position.y = Math.round((innerHeight - bounds.top) / canvasRenderer.scale);
            }
            cursorWidth = 1;
            cursorHeight = 1;
            canvasRenderer.haveZoomRendering
              ? (elements.placeholderMobile.css(
                  'webkitTransform',
                  'translate(' + position.x + 'px, ' + position.y + 'px)'
                ),
                elements.placeholderMobile.css(
                  'transform',
                  'translate(' + position.x + 'px, ' + position.y + 'px)'
                ))
              : (elements.placeholderMobile.css(
                  'webkitTransform',
                  'translate(' + position.x + 'px, ' + position.y + 'px)'
                ),
                elements.placeholderMobile.css(
                  'transform',
                  'translate(' + position.x + 'px, ' + position.y + 'px)'
                ));
            elements.placeholderMobile.css('width', cursorWidth + 'px');
            elements.placeholderMobile.css('height', cursorHeight + 'px');
            pointer.x = position.x;
            pointer.y = position.y;
            elements.coordinates.text(pointer.x + ',' + pointer.y);
            pointer.triggerCursor(true);
            return;
          } else {
            pointer.setCursorCoords(event);
            event = normalizePointerEvent(event);
            var offset = {};
            offset.left = event.pageX + 10;
            offset.top = event.pageY + 10;
            elements.cursor.offset(offset);
            if (pointer.x !== null && pointer.y !== null) {
              if (selectedItemId) {
                var radius = parseInt(serverData.shop.items[selectedItemId].radius),
                  position = pointer.paintingToScreenSpace(pointer.x - radius / 2, pointer.y - radius / 2),
                  x = parseInt(position.x),
                  y = parseInt(position.y),
                  cursorWidth = parseInt(canvasRenderer.scale * (radius + 2)) + 1,
                  cursorHeight = parseInt(canvasRenderer.scale * (radius + 2)) + 1;
                elements.placeholder.css('webkitTransform', 'translate(' + x + 'px, ' + y + 'px)');
                elements.placeholder.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
                elements.placeholder.css('width', cursorWidth + 'px');
                elements.placeholder.css('height', cursorHeight + 'px');
              } else {
                var position = pointer.paintingToScreenSpace(pointer.x, pointer.y);
                elements.placeholder.css(
                  'webkitTransform',
                  'translate(' + parseInt(position.x) + 'px, ' + parseInt(position.y) + 'px)'
                );
                elements.placeholder.css(
                  'transform',
                  'translate(' + parseInt(position.x) + 'px, ' + parseInt(position.y) + 'px) '
                );
                elements.placeholder.css(
                  'width',
                  parseInt(canvasRenderer.scale * canvasRenderer.brush.size) + 1 + 'px'
                );
                elements.placeholder.css(
                  'height',
                  parseInt(canvasRenderer.scale * canvasRenderer.brush.size) + 1 + 'px'
                );
              }
              pointer.triggerCursor(true);
            } else pointer.triggerCursor(false);
          }
        }
      };
      if (serverData.lottery) {
        $('.pixel-lottery-btn').show();
        if (localStorage) {
          var lastLotteryOpenedAt = localStorage.getItem('last-lottery-open', nowSeconds());
          lastLotteryOpenedAt &&
            parseInt(lastLotteryOpenedAt) > nowSeconds() - 172800 &&
            ($('.pixel-lottery-btn').css('-webkit-animation', 'none'),
            $('.pixel-lottery-btn').css('bottom', '-28px'));
        }
      } else $('.pixel-lottery-btn').hide();
      $(document).on(
        'click',
        '.open-museum',
        /**
         * Registered click callback delegated to ".open-museum". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/gembox.php.
         *
         * Observed DOM operations: css, hide, show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#museum').css('display', 'block');
          $('#museum .box-content-x > div').hide();
          $('#museum .box-x').show();
          $('#museum .box-content-x > div').show();
          $('#museum .box-content-x > .loading').hide();
          var requestData = {};
          requestData.museum = true;
          api.xhr.req(
            'GET',
            '/api/gembox.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/gembox.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: css, hide, show, html, append, text, attr.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              $('#museum').css('display', 'block');
              $('#museum .box-content-x > div').hide();
              $('#museum .box-x').show();
              $('#museum .box-content-x > div').show();
              $('#museum .box-content-x > .loading').hide();
              if (success) {
                $('#museum .framed-list').html('');
                if (response.framed !== undefined && response.framed.length) {
                  for (var key in response.framed) {
                    var count = 0;
                    if (parseInt(response.framed[key].frame_id) === 1) count = 'copper-frame-bg.png';
                    else if (parseInt(response.framed[key].frame_id) === 2) {
                      count = 'iron-frame-bg.png';
                    } else if (parseInt(response.framed[key].frame_id) === 3) {
                      count = 'pyrite-frame-bg.png';
                    } else
                      parseInt(response.framed[key].frame_id) === 4 && (count = 'pixelite-frame-bg.png?v=1');
                    var gETCount = 0;
                    if (parseInt(response.framed[key].gems_id) === 1) gETCount = 'emerald-frame-bg.png';
                    else if (parseInt(response.framed[key].gems_id) === 2) gETCount = 'sapphire-frame-bg.png';
                    else parseInt(response.framed[key].gems_id) === 3 && (gETCount = 'ruby-frame-bg.png');
                    var text = '',
                      thumbnailBackgroundClass = 'bg-transparent';
                    parseInt(response.framed[key].bg) > -1 &&
                      ((text =
                        'background-color:' + appState.painting.palette.colors[response.framed[key].bg]),
                      (thumbnailBackgroundClass = ''));
                    var element = $(
                      '<div class="museum-row"><div class="painting-bloc" data-framed="' +
                        response.framed[key].id +
                        '">' +
                        ' <img src="/canvas/' +
                        response.framed[key].painting_id +
                        '.png?t=' +
                        (parseInt(response.framed[key].created_at) + 600) +
                        '" class="pixelate ' +
                        thumbnailBackgroundClass +
                        '" style="' +
                        text +
                        '">' +
                        ' <div class="frame"><div class="bg-sp sp-framed-' +
                        response.framed[key].sp +
                        '"></div><div class="bg-rainbow"></div><img src="/img/' +
                        count +
                        '" class="pixelate">' +
                        '     <div><img src="/img/' +
                        gETCount +
                        '"></div>' +
                        ' </div>' +
                        ' <a href="#" class="author open-profile" data-profile="" title="Author">' +
                        '     <div class="arrow"></div>' +
                        '     <div class="icns"></div>' +
                        '     <div class="author-name"></div>' +
                        ' </a>' +
                        ' <div class="sold">' +
                        '     <div class="arrow"></div>' +
                        '     <div class="sold-amount"></div>' +
                        ' </div>' +
                        '</div></div></div>'
                    );
                    $('#museum .framed-list').append(element);
                    parseInt(response.framed[key].frame_id) == 4
                      ? element.find('.bg-rainbow').show()
                      : element.find('.bg-rainbow').hide();
                    if (parseInt(response.framed[key].current_bid) > 0) {
                      element
                        .find('.sold .sold-amount')
                        .html(
                          '<div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="14"></div> ' +
                            response.framed[key].current_bid +
                            '<a href="#" class="link display-block open-profile" data-profile=""></a>'
                        );
                      element
                        .find('.sold .sold-amount')
                        .find('.open-profile')
                        .text(response.framed[key].owner_username);
                      element
                        .find('.sold .sold-amount')
                        .find('.open-profile')
                        .attr('data-profile', response.framed[key].owner_username);
                      element.find('.sold').show();
                    } else {
                      element.find('.sold').hide();
                    }
                    element.find('.author-name').text(response.framed[key].author_username);
                    element
                      .find('.author.open-profile')
                      .attr('data-profile', response.framed[key].author_username);
                    if (response.framed[key].author_icons) {
                      var parts = response.framed[key].author_icons.split(',');
                      for (var partKey in parts) {
                        element
                          .find('.icns')
                          .append(
                            '<img src="/img/badges/' + parts[partKey] + '.png" class="badge" width="16">'
                          );
                      }
                    }
                    parseInt(key) === 0 && $('#museum .framed-list').append('<br>');
                    parseInt(key) === 3 && $('#museum .framed-list').append('<br>');
                  }
                  for (var key in response.framed_unsold) {
                    var count = 0;
                    if (parseInt(response.framed_unsold[key].frame_id) === 1) {
                      count = 'copper-frame-bg.png';
                    } else if (parseInt(response.framed_unsold[key].frame_id) === 2)
                      count = 'iron-frame-bg.png';
                    else if (parseInt(response.framed_unsold[key].frame_id) === 3)
                      count = 'pyrite-frame-bg.png';
                    else
                      parseInt(response.framed_unsold[key].frame_id) === 4 &&
                        (count = 'pixelite-frame-bg.png?v=1');
                    var gETCount = 0;
                    if (parseInt(response.framed_unsold[key].gems_id) === 1)
                      gETCount = 'emerald-frame-bg.png';
                    else if (parseInt(response.framed_unsold[key].gems_id) === 2)
                      gETCount = 'sapphire-frame-bg.png';
                    else if (parseInt(response.framed_unsold[key].gems_id) === 3) {
                      gETCount = 'ruby-frame-bg.png';
                    }
                    var text = '',
                      thumbnailBackgroundClass = 'bg-transparent';
                    parseInt(response.framed_unsold[key].bg) > -1 &&
                      ((text =
                        'background-color:' +
                        appState.painting.palette.colors[response.framed_unsold[key].bg]),
                      (thumbnailBackgroundClass = ''));
                    var element = $(
                      '<div class="museum-row"><div class="painting-bloc" data-framed="' +
                        response.framed_unsold[key].id +
                        '">' +
                        ' <img src="/canvas/' +
                        response.framed_unsold[key].painting_id +
                        '.png?t=' +
                        (parseInt(response.framed_unsold[key].created_at) + 600) +
                        '" class="pixelate ' +
                        thumbnailBackgroundClass +
                        '" style="' +
                        text +
                        '">' +
                        ' <div class="frame"><div class="bg-sp sp-framed-' +
                        response.framed_unsold[key].sp +
                        '"></div><div class="bg-rainbow"></div><img src="/img/' +
                        count +
                        '" class="pixelate">' +
                        '     <div><img src="/img/' +
                        gETCount +
                        '"></div>' +
                        ' </div>' +
                        ' <a href="#" class="author open-profile" data-profile="" title="Author">' +
                        '     <div class="arrow"></div>' +
                        '     <div class="icns"></div>' +
                        '     <div class="author-name"></div>' +
                        ' </a>' +
                        ' <div class="sold">' +
                        '     <div class="arrow"></div>' +
                        '     <div class="sold-amount"></div>' +
                        ' </div>' +
                        '</div></div></div>'
                    );
                    $('#museum .framed-list').append(element);
                    if (parseInt(response.framed_unsold[key].frame_id) == 4) {
                      element.find('.bg-rainbow').show();
                    } else element.find('.bg-rainbow').hide();
                    element.find('.sold').hide();
                    element.find('.author-name').text(response.framed_unsold[key].author_username);
                    element
                      .find('.author.open-profile')
                      .attr('data-profile', response.framed_unsold[key].author_username);
                    if (response.framed_unsold[key].author_icons) {
                      var parts = response.framed_unsold[key].author_icons.split(',');
                      for (var partKey in parts) {
                        element
                          .find('.icns')
                          .append(
                            '<img src="/img/badges/' + parts[partKey] + '.png" class="badge" width="16">'
                          );
                      }
                    }
                  }
                }
              } else {
                showNotification('error', 'Error', response.message);
              }
            }
          );
        }
      );
      $(document).on(
        'click',
        '.open-pixel-lottery',
        /**
         * Registered click callback delegated to ".open-pixel-lottery". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/get-jackpot-ticket.php.
         *
         * Observed DOM operations: css, hide, show, text.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.px-lottery').css('display', 'block');
          $('.px-lottery .box-content-x > div').hide();
          $('.px-lottery .box-x').show();
          $('.px-lottery .box-content-x > div').show();
          $('.px-lottery .box-content-x > .loading').hide();
          $('.px-lottery .jackpot-time').text('Loading...');
          $('.px-lottery .jackpot-amount').text('Loading...');
          $('.px-lottery .jackpot-users').text('Loading...');
          $('.px-lottery .user-tickets').text('-');
          $('.px-lottery .no-jackpot').hide();
          $('.px-lottery .active-jackpot').show();
          api.xhr.req(
            'GET',
            '/api/get-jackpot-ticket.php',
            {},
            true,
            /**
             * HTTP completion callback for /api/get-jackpot-ticket.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: css, hide, show, html, append, text.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              $('.px-lottery').css('display', 'block');
              $('.px-lottery .box-content-x > div').hide();
              $('.px-lottery .box-x').show();
              $('.px-lottery .box-content-x > div').show();
              $('.px-lottery .box-content-x > .loading').hide();
              if (success) {
                if (response.lottery) {
                  $('.px-lottery .no-jackpot').hide();
                  $('.px-lottery .active-jackpot').show();
                } else {
                  $('.px-lottery .no-jackpot').show();
                  $('.px-lottery .active-jackpot').hide();
                }
                var endAt = 0,
                  text = 'Selecting a winner... refresh the page in a few minutes';
                if (response.endAt > nowSeconds()) {
                  endAt = response.endAt - nowSeconds();
                  text = '';
                  if (endAt >= 86400) {
                    var number = Math.floor(endAt / 86400);
                    text += number + ' day' + (number === 1 ? '' : 's') + '';
                    endAt -= number * 86400;
                  }
                  if (endAt >= 3600) {
                    var mathFloor = Math.floor(endAt / 3600);
                    text != '' && (text += ', ');
                    text += mathFloor + ' hour' + (mathFloor === 1 ? '' : 's') + '';
                  } else if (text != '') {
                  } else text = 'less than an hour';
                }
                $('.px-lottery .past-winners table').html(
                  '<tr><td>Player</td><td>Tickets bought</td><td>Jackpot</td><td>Date</td></tr>'
                );
                var rowStripeClass = 'stripped';
                for (var key in response.past) {
                  var element = $(
                    '<tr class="' +
                      rowStripeClass +
                      '"><td><a href="#" class="open-profile" data-profile="' +
                      response.past[key].winner_username +
                      '">' +
                      response.past[key].winner_username +
                      '</a></td><td>' +
                      response.past[key].winner_tickets +
                      '</td><td>' +
                      response.past[key].jackpot +
                      '</td><td>' +
                      new Date(response.past[key].end_date).toLocaleDateString() +
                      ' </td></tr>'
                  );
                  $('.px-lottery .past-winners table').append(element);
                  if (rowStripeClass === 'stripped') {
                    rowStripeClass = '';
                  } else rowStripeClass = 'stripped';
                }
                $('.px-lottery .jackpot-time').text(text);
                $('.px-lottery .jackpot-users').text(response.users);
                $('.px-lottery .jackpot-amount').text(response.jackpot);
                $('.px-lottery .user-tickets').text(response.tickets);
              } else showNotification('error', 'Error', response.message);
            }
          );
          $('.pixel-lottery-btn').css('-webkit-animation', 'none');
          $('.pixel-lottery-btn').css('bottom', '-28px');
          if (localStorage) {
            localStorage.setItem('last-lottery-open', nowSeconds());
          }
        }
      );
      $('.px-lottery .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: css.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.px-lottery').css('display', 'none');
        }
      );
      $(document).on(
        'click',
        '.btn-jackpot-buy',
        /**
         * Registered click callback delegated to ".btn-jackpot-buy". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-jackpot-ticket.php.
         *
         * Observed DOM operations: element.attr, attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var element = $(this);
          if (element.attr('disabled') != 'true') {
            element.attr('disabled', 'true');
            var userInventory = {};
            userInventory.tickets = $(this).attr('data-id');
            var requestData = userInventory,
              knowAboutSpendingForTickets = false;
            if (localStorage) {
              knowAboutSpendingForTickets = localStorage.getItem('know-about-spending-for-tickets');
            }
            knowAboutSpendingForTickets ||
            confirm(
              "You are about to spend some PP coins to get tickets for the next lottery, would you like to continue? (this message won't show up next time)"
            )
              ? (localStorage && localStorage.setItem('know-about-spending-for-tickets', 1),
                api.xhr.req(
                  'POST',
                  '/api/post-jackpot-ticket.php',
                  requestData,
                  true,
                  /**
                   * HTTP completion callback for /api/post-jackpot-ticket.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                   *
                   * Shared/receiver state written: serverData.user.ppcoins.
                   *
                   * Observed DOM operations: text.
                   *
                   * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                   */
                  function (success, response) {
                    element.removeAttr('disabled');
                    success
                      ? ($('#pixel-lottery .user-tickets').text(response.tickets),
                        showNotification('success', 'Success', requestData.tickets + ' ticket added'),
                        (serverData.user.ppcoins = parseInt(response.ppcoins)),
                        $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                          serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                        ))
                      : showNotification('error', 'Error', response.message);
                  }
                ))
              : element.removeAttr('disabled');
          }
        }
      );
      $(document).on(
        'click',
        '#mobileplace a.mobile-place',
        /**
         * Registered click callback delegated to "#mobileplace a.mobile-place". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: pointer.mobileBrushActivated, pointer.mobileFirstActivation, canvasRenderer.scale.
         *
         * Observed DOM operations: text, show, hide.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         */
        function () {
          if (pointer.mobileBrushActivated) {
            pointer.mobileBrushActivated = false;
            $(this).find('span').text('Activate Brush?');
            $(this).find('div').show();
          } else
            serverData.painting.cooldown > 0
              ? canvasRenderer.drawPixelAt()
              : (pointer.mobileFirstActivation &&
                  ((pointer.mobileFirstActivation = false),
                  (canvasRenderer.scale = 10),
                  zoomAroundViewportCenter(true)),
                (pointer.mobileBrushActivated = true),
                $(this).find('span').text('Disable Brush?'),
                $(this).find('div').hide());
        }
      );
      var warActive = false;
      $(document).on(
        'click',
        '#mobilebomb a',
        /**
         * Registered click callback delegated to "#mobilebomb a". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         */
        function () {
          if (pointer.touchDevice) {
            if (selectedItemId !== null) {
              $('#mobilebomb').hide();
              canvasRenderer.useWeapon();
            }
          }
        }
      );
      var saveTrackingButton = $('#save-tracking'),
        pixelHistoryByPosition = {},
        trackedUsernames = {},
        trackingSnapshotAt = 0,
        viewingHistory = false,
        historyPlaying = false,
        historyPlayback = {},
        trackingSnapshotImage = null,
        renderTracking = true;
      /**
       * Load a recorded snapshot/history for the time-machine UI. Replay is a separate rendering mode, with its own image load and timing callbacks. The live client state is still shared, so replay guards must remain in their original placement branches.
       *
       * Direct network calls: GET /tracking/ <dynamic suffix>.
       */
      /* Fetch the recorded snapshot and pixel history used by the time-machine view; entering history changes the client rendering mode. */
      function loadTrackingHistory() {
        if (!trackingSnapshotAt) {
          showNotification('error', 'Error', 'No recent tracking data available');
        } else
          viewingHistory
            ? window.location.reload()
            : (setPaintingLoading(true),
              api.xhr.req(
                'GET',
                '/tracking/' + serverData.painting.id + '.json?t=' + trackingSnapshotAt,
                {},
                true,
                /**
                 * HTTP completion callback for /tracking/. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Shared/receiver state written: viewingHistory, trackingSnapshotImage, trackingSnapshotImage.onload, trackingSnapshotImage.src.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  success
                    ? serverData.painting.protection &&
                      ((viewingHistory = true),
                      chat.display(false),
                      (trackingSnapshotImage = new Image()),
                      /**
                       * Outgoing socket event names: save.tracking.pending.
                       *
                       * Shared/receiver state written: canvasRenderer.element.ctx.painting.fillStyle, historyPlayback.
                       *
                       * Observed DOM operations: text, show.
                       */
                      (trackingSnapshotImage.onload = function () {
                        canvasRenderer.element.ctx.painting.fillStyle = 'rgba(255, 255, 255, 0)';
                        canvasRenderer.element.ctx.painting.clearRect(
                          0,
                          0,
                          serverData.painting.width,
                          serverData.painting.height
                        );
                        canvasRenderer.element.ctx.painting.drawImage(trackingSnapshotImage, 0, 0);
                        parseInt(serverData.user.premium.expire_at) < nowSeconds() ||
                        !serverData.user.premium.active
                          ? $('#timemachine')
                              .find('.inf')
                              .text('Pixels placed recently (delayed for non-premium users)')
                          : $('#timemachine').find('.inf').text('Pixels placed recently');
                        $('#timemachine').show();
                        historyPlayback = response;
                        parseInt(serverData.user.premium.expire_at) < nowSeconds() ||
                        !serverData.user.premium.active
                          ? (setPaintingLoading(false), startHistoryPlayback())
                          : connection.io.emit('save.tracking.pending', serverData.painting.id);
                      }),
                      (trackingSnapshotImage.src =
                        serverData.host.http +
                        'tracking/' +
                        serverData.painting.id +
                        '.png?t=' +
                        trackingSnapshotAt))
                    : (setPaintingLoading(false), showNotification('error', 'Error', response.message));
                }
              ));
      }
      /**
       * Shared/receiver state written: historyPlaying, serverData.user.settings.painting.liveTracking.
       *
       * Observed DOM operations: attr.
       *
       * Scheduled work: requestAnimationFrame.
       */
      function startHistoryPlayback() {
        historyPlaying = true;
        serverData.user.settings.painting.liveTracking = true;
        $('#timemachine').find('input[type="range"]').attr('min', 0);
        $('#timemachine').find('input[type="range"]').attr('max', historyPlayback.pixels.length);
        window.requestAnimationFrame(renderHistoryFrame);
      }
      var playbackPixelIndex = 0;
      /**
       * Render the next eligible recorded pixels according to the original playback index, elapsed-time check and speed. requestAnimationFrame schedules presentation work; the timestamp field used for the recorded history remains distinct from the frame clock.
       *
       * Shared/receiver state written: canvasRenderer.element.ctx.painting.fillStyle, canvasRenderer.liveTrackingUsers[computed], canvasRenderer.liveTrackingUsers[computed].n, canvasRenderer.liveTrackingUsers[computed].t, canvasRenderer.liveTrackingUsers[computed].c.
       *
       * Observed DOM operations: canvasRenderer.element.move.append, show, css, val, text.
       *
       * Scheduled work: requestAnimationFrame.
       *
       * Input bindings: unusedFrameTime. Names describe inferred roles; protocol field names are preserved separately.
       */
      /* Advance recorded pixels at the selected playback speed while keeping rendering on animation frames. */
      function renderHistoryFrame(unusedFrameTime) {
        if (historyPlaying) {
          var timestamp = nowMilliseconds();
          playbackPixelIndex++;
          if (historyPlayback.pixels[playbackPixelIndex]) {
            var pixelEntry = historyPlayback.pixels[playbackPixelIndex];
            canvasRenderer.element.ctx.painting.fillStyle = appState.painting.palette.colors[pixelEntry[2]];
            canvasRenderer.element.ctx.painting.fillRect(pixelEntry[0], pixelEntry[1], 1, 1);
            renderTracking &&
              (canvasRenderer.liveTrackingUsers[pixelEntry[3]] === undefined ||
              canvasRenderer.liveTrackingUsers[pixelEntry[3]].r
                ? ((canvasRenderer.liveTrackingUsers[pixelEntry[3]] = {
                    t: timestamp + 4000,
                    n: '',
                    c: pixelEntry[2],
                    r: false
                  }),
                  historyPlayback.names[pixelEntry[3]] &&
                    (canvasRenderer.liveTrackingUsers[pixelEntry[3]].n =
                      historyPlayback.names[pixelEntry[3]]),
                  canvasRenderer.element.move.append(
                    '<div class="track open-profile no-transition" style="display:none" data-profile="' +
                      canvasRenderer.liveTrackingUsers[pixelEntry[3]].n.toLowerCase() +
                      '" data-id="' +
                      pixelEntry[3] +
                      '" style="border-color:' +
                      appState.painting.palette.colors[pixelEntry[2]] +
                      '">' +
                      canvasRenderer.liveTrackingUsers[pixelEntry[3]].n +
                      '</div>'
                  ))
                : ((canvasRenderer.liveTrackingUsers[pixelEntry[3]].t = timestamp + 4000),
                  (canvasRenderer.liveTrackingUsers[pixelEntry[3]].c = pixelEntry[2])),
              canvasRenderer.element.move
                .find('.track[data-id="' + pixelEntry[3] + '"]')
                .css({
                  top: pixelEntry[1] + 1 + 'px',
                  left: pixelEntry[0] + 1 + 'px',
                  'border-color': appState.painting.palette.colors[pixelEntry[2]]
                })
                .show());
            $('#timemachine').find('input[type="range"]').val(playbackPixelIndex);
            $('#timemachine').find('.timestamp').text(new Date(pixelEntry[4]).toLocaleTimeString());
          }
        }
        window.requestAnimationFrame(renderHistoryFrame);
      }
      $(document).on(
        'click',
        '#timemachine .pause',
        /**
         * Registered click callback delegated to "#timemachine .pause". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: historyPlaying.
         *
         * Scheduled work: requestAnimationFrame.
         */
        function () {
          historyPlaying
            ? (historyPlaying = false)
            : ((historyPlaying = true), window.requestAnimationFrame(renderHistoryFrame));
        }
      );
      $(document).on(
        'click',
        '#timemachine .close',
        /**
         * Registered click callback delegated to "#timemachine .close". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: historyPlaying.
         */
        function () {
          historyPlaying = false;
          window.location.reload();
        }
      );
      $(document).on(
        'click',
        '#timemachine .restart',
        /**
         * Registered click callback delegated to "#timemachine .restart". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: historyPlaying, playbackPixelIndex, canvasRenderer.element.ctx.painting.fillStyle.
         *
         * Observed DOM operations: val.
         */
        function () {
          historyPlaying = false;
          playbackPixelIndex = 0;
          $('#timemachine').find('input[type="range"]').val(playbackPixelIndex);
          canvasRenderer.element.ctx.painting.fillStyle = 'rgba(255, 255, 255, 0)';
          canvasRenderer.element.ctx.painting.clearRect(
            0,
            0,
            serverData.painting.width,
            serverData.painting.height
          );
          canvasRenderer.element.ctx.painting.drawImage(trackingSnapshotImage, 0, 0);
          historyPlaying = true;
        }
      );
      $(document).on(
        'input',
        '#timemachine [type="range"]',
        /**
         * Registered input callback delegated to "#timemachine [type=\"range\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: historyPlaying.
         *
         * Observed DOM operations: val, text.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         */
        function () {
          historyPlaying = false;
          var inputValue = parseInt($(this).val());
          if (historyPlayback.pixels[inputValue]) {
            $('#timemachine')
              .find('.timestamp')
              .text(new Date(historyPlayback.pixels[inputValue][4]).toLocaleTimeString());
          }
        }
      );
      $(document).on(
        'change',
        '#timemachine [type="range"]',
        /**
         * Registered change callback delegated to "#timemachine [type=\"range\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: historyPlaying, playbackPixelIndex, canvasRenderer.element.ctx.painting.fillStyle.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         */
        function () {
          historyPlaying = false;
          playbackPixelIndex = parseInt($(this).val());
          canvasRenderer.element.ctx.painting.fillStyle = 'rgba(255, 255, 255, 0)';
          canvasRenderer.element.ctx.painting.clearRect(
            0,
            0,
            serverData.painting.width,
            serverData.painting.height
          );
          canvasRenderer.element.ctx.painting.drawImage(trackingSnapshotImage, 0, 0);
          var count = 0;
          while (count < playbackPixelIndex) {
            canvasRenderer.element.ctx.painting.fillStyle =
              appState.painting.palette.colors[historyPlayback.pixels[count][2]];
            canvasRenderer.element.ctx.painting.fillRect(
              historyPlayback.pixels[count][0],
              historyPlayback.pixels[count][1],
              1,
              1
            );
            count++;
          }
          historyPlaying = true;
        }
      );
      var zoomLimits = {};
      zoomLimits.min = 0.5;
      zoomLimits.max = 400;
      var lastPixelPlaced = {};
      lastPixelPlaced.index = '';
      lastPixelPlaced.time = 0;
      var canvasElements = {};
      canvasElements.painting = null;
      canvasElements.protect = null;
      var canvasContexts = {};
      canvasContexts.painting = null;
      canvasContexts.protect = null;
      var paintingElements = {};
      paintingElements.painting = $('#painting');
      paintingElements.zoom = $('#painting-zoom');
      paintingElements.move = $('#painting-move');
      paintingElements.grid = $('#painting-grid');
      paintingElements.infos = $('#painting-infos');
      paintingElements.canvas = canvasElements;
      paintingElements.ctx = canvasContexts;
      /* Own canvas buffers, view transforms, drawing tools, protection overlays, placement state, and rendering callbacks. */
      var canvasRenderer = {
        currentImgDataProtection: null,
        x: 0,
        y: 0,
        width: serverData.painting.width,
        height: serverData.painting.height,
        scale: 1,
        color: 0,
        loaded: false,
        zoom: zoomLimits,
        mode: 0,
        protectionWithBG: false,
        brush: {
          size: serverData.painting.brush.size
        },
        protectionRGB: 204,
        haveZoomRendering: false,
        paletteRGB: {},
        isFlashingProtection: 0,
        lastPixelPlaced: lastPixelPlaced,
        element: paintingElements,
        tDelay: 0,
        liveTrackingUsers: {},
        lastStartAccessFetch: 0,
        paintingListCache: [],
        paintingListStart: 0,
        paintingListSearch: '',
        settingsLoaded: false,
        cooldown: 0,
        cooldownSetInterval: null,
        tryingToUseWeapon: false,
        saveTrackingEnabled: false,
        pRTime: 0,
        pSave: 4,
        centerPositionTo: function (scale, centerX, centerY) {
          scale !== undefined && (canvasRenderer.scale = canvasRenderer.formatScale(scale));
          if (centerX !== undefined) {
            canvasRenderer.x = canvasRenderer.width / 2 - centerX;
          }
          centerY !== undefined && (canvasRenderer.y = canvasRenderer.height / 2 - centerY);
          canvasRenderer.updateScaleAndPosition();
        },
        formatScale: function (scale) {
          if (scale < canvasRenderer.zoom.min) scale = canvasRenderer.zoom.min;
          else if (scale > canvasRenderer.zoom.max) scale = canvasRenderer.zoom.max;
          else {
            scale = roundToDecimals(scale, 2);
          }
          return scale;
        },
        updateUrlHash: function () {
          window.location.replace(
            '#x=' +
              Math.round(canvasRenderer.width / 2 - canvasRenderer.x) +
              '&y=' +
              Math.round(canvasRenderer.height / 2 - canvasRenderer.y) +
              '&s=' +
              canvasRenderer.scale
          );
        },
        /* Read the shared x/y/scale view from the URL and constrain zoom to the configured bounds. */ getUrlHash:
          function () {
            var position = {};
            position.x = canvasRenderer.x;
            position.y = canvasRenderer.y;
            position.s = canvasRenderer.scale;
            var convertedPosition = position,
              hash = window.location.hash;
            if (hash != '') {
              var hash = hash.split('=');
              if (hash.length >= 4) {
                convertedPosition.x = parseInt(hash[1]);
                convertedPosition.y = parseInt(hash[2]);
                convertedPosition.s = parseFloat(hash[3]);
                if (convertedPosition.s > canvasRenderer.zoom.max) {
                  convertedPosition.s = canvasRenderer.zoom.max;
                } else if (convertedPosition.s < canvasRenderer.zoom.min) {
                  convertedPosition.s = canvasRenderer.zoom.min;
                }
              }
            }
            return convertedPosition;
          },
        /**
         * Apply the current view transform and associated overlays. This is a presentation operation over shared x/y/scale state, not a pixel-data edit. Chat/input state and the original rendering-mode branches can affect work performed before the transform is applied.
         *
         * Shared/receiver state written: canvasRenderer.x, canvasRenderer.y.
         *
         * Observed DOM operations: canvasRenderer.element.canvas.painting.removeClass, canvasRenderer.element.canvas.painting.addClass, canvasRenderer.element.move.css, canvasRenderer.element.zoom.css, canvasRenderer.element.grid.css.
         */
        updateScaleAndPosition: function () {
          {
            canvasRenderer.x = Math.min(
              canvasRenderer.width / 2,
              Math.max(-canvasRenderer.width / 2, canvasRenderer.x)
            );
            canvasRenderer.y = Math.min(
              canvasRenderer.height / 2,
              Math.max(-canvasRenderer.height / 2, canvasRenderer.y)
            );
            if (Math.abs(canvasRenderer.scale) < 1) {
              canvasRenderer.element.canvas.painting.removeClass('pixelate');
            } else {
              canvasRenderer.element.canvas.painting.removeClass('pixelate');
              canvasRenderer.element.canvas.painting.addClass('pixelate');
            }
            canvasRenderer.element.move.css(
              'webkitTransform',
              'translate(' + canvasRenderer.x + 'px, ' + canvasRenderer.y + 'px)'
            );
            canvasRenderer.element.move.css(
              'transform',
              'translate(' + canvasRenderer.x + 'px, ' + canvasRenderer.y + 'px)'
            );
            if (canvasRenderer.haveZoomRendering)
              canvasRenderer.element.zoom.css('zoom', (canvasRenderer.scale * 100).toString() + '%');
            else {
              canvasRenderer.element.zoom.css('webkitTransform', 'scale(' + canvasRenderer.scale + ')');
              canvasRenderer.element.zoom.css('transform', 'scale(' + canvasRenderer.scale + ')');
            }
            var paintingPosition = pointer.screenToPaintingSpace(0, 0),
              scale = canvasRenderer.scale;
            const integerZoomScale = Math.max(1, Math.floor(scale)),
              renderScaleRatio = scale / integerZoomScale;
            var styles = {};
            styles.backgroundSize = integerZoomScale + 'px ' + integerZoomScale + 'px';
            styles.transform =
              'translate(' +
              Math.floor((-paintingPosition.x % 1) * integerZoomScale) +
              'px,' +
              Math.floor((-paintingPosition.y % 1) * integerZoomScale) +
              'px) scale(' +
              renderScaleRatio +
              ')';
            styles.opacity = (scale - 2) / 6;
            canvasRenderer.element.grid.css(styles);
          }
        },
        /**
         * Read an existing pixel from the painting buffer and resolve it against the current palette. The caller can request the resolved color or use the path that updates selection. Palette indices remain protocol/storage values; changing their order would change meaning.
         *
         * Input bindings: x, y, returnColorOnly. Names describe inferred roles; protocol field names are preserved separately.
         */
        getColorFromPainting: function (x, y, returnColorOnly) {
          var data = canvasRenderer.element.ctx.painting.getImageData(x, y, 1, 1).data;
          data = rgbToHex(data[0], data[1], data[2]);
          var paletteIndex = $.inArray(data.toUpperCase(), appState.painting.palette.colors);
          if (paletteIndex !== -1) {
            if (returnColorOnly) {
              return paletteIndex;
            } else return canvasRenderer.selectPaletteColor(paletteIndex);
          }
        },
        /**
         * Read the original protection image/buffer for a painting coordinate. This is a browser-side preliminary check over the latest local snapshot and does not prove that a later server request will be permitted.
         *
         * Shared/receiver state written: canvasRenderer.currentImgDataProtection.
         *
         * Input bindings: x, y. Names describe inferred roles; protocol field names are preserved separately.
         */
        checkProtectionFromPainting: function (x, y) {
          canvasRenderer.currentImgDataProtection === null &&
            (canvasRenderer.currentImgDataProtection = canvasRenderer.element.ctx.protected.getImageData(
              0,
              0,
              serverData.painting.width,
              serverData.painting.height
            ).data);
          var pixelByteOffset = x * 4 + y * serverData.painting.width * 4;
          if (
            canvasRenderer.currentImgDataProtection[pixelByteOffset] === canvasRenderer.protectionRGB &&
            canvasRenderer.currentImgDataProtection[pixelByteOffset + 1] === canvasRenderer.protectionRGB &&
            canvasRenderer.currentImgDataProtection[pixelByteOffset + 2] === canvasRenderer.protectionRGB
          )
            return true;
          else {
            return false;
          }
        },
        /**
         * Compare the requested placement with currently rendered pixel data using the original palette conversion. This avoids a local duplicate path; it does not replace server-side placement validation or guarantee that the local snapshot is current.
         *
         * Input bindings: x, y, paletteIndex. Names describe inferred roles; protocol field names are preserved separately.
         */
        checkDuplicateFromPainting: function (x, y, paletteIndex) {
          var data = canvasRenderer.element.ctx.painting.getImageData(x, y, 1, 1).data;
          return canvasRenderer.paletteRGB[paletteIndex][0] === data[0] &&
            canvasRenderer.paletteRGB[paletteIndex][1] === data[1] &&
            canvasRenderer.paletteRGB[paletteIndex][2] === data[2]
            ? true
            : false;
        },
        checkSamePlaceThanLast: function (x, y, color, userId) {
          if (
            canvasRenderer.lastPixelPlaced.index === x + '-' + y + '-' + color + '-' + userId &&
            canvasRenderer.lastPixelPlaced.time > nowMilliseconds()
          ) {
            return true;
          } else return false;
        },
        /**
         * Manage the original cooldown display and any repeating countdown update. The display uses browser time and the existing server-provided cooldown state. Clearing the previous interval before replacing it prevents multiple countdown callbacks from controlling the same UI.
         *
         * Shared/receiver state written: canvasRenderer.cooldownSetInterval.
         *
         * Observed DOM operations: hide, show, elements.cooldown.show.
         *
         * Scheduled work: setInterval (10 ms).
         *
         * Input bindings: showCountdown, dotting. Names describe inferred roles; protocol field names are preserved separately.
         */
        triggerCooldownPanel: function (showCountdown, dotting) {
          if (canvasRenderer.cooldownSetInterval !== null) {
            clearInterval(canvasRenderer.cooldownSetInterval);
          }
          if (showCountdown) {
            canvasRenderer.cooldownSetInterval = setInterval(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Observed DOM operations: elements.cooldown.hide, text.
               */
              function () {
                var cooldown = canvasRenderer.cooldown + 1000 - nowMilliseconds();
                if (cooldown < 0) {
                  cooldown = 0;
                  clearInterval(canvasRenderer.cooldownSetInterval);
                  elements.cooldown.hide();
                } else {
                  cooldown = parseInt(cooldown / 1000);
                }
                !dotting &&
                  cooldown > serverData.painting.cooldown &&
                  (cooldown = serverData.painting.cooldown);
                var number = 0,
                  text = 0;
                if (cooldown > 60) {
                  number = parseInt(cooldown / 60);
                  text = cooldown - number * 60;
                } else {
                  text = cooldown;
                }
                if (number < 10) {
                  number = '0' + number;
                }
                if (text < 10) {
                  text = '0' + text;
                }
                elements.cooldown.find('.box .cd').text(number + ':' + text);
              },
              10
            );
            elements.cooldown.find('.head').hide();
            elements.cooldown.find('.foot').hide();
            dotting
              ? (elements.cooldown.find('.head[data-id="dotting"]').show(),
                elements.cooldown.find('.foot[data-id="dotting"]').show())
              : (elements.cooldown.find('.head[data-id="painting"]').show(),
                elements.cooldown.find('.foot[data-id="painting"]').show());
            elements.cooldown.show();
          }
        },
        initPaletteRGB: function () {
          for (var key in appState.painting.palette.order) {
            var orderEntry = appState.painting.palette.order[key];
            if ($.inArray(orderEntry, serverData.painting.palette) !== -1) {
              var colorEntry = appState.painting.palette.colors[orderEntry];
              canvasRenderer.paletteRGB[orderEntry] = hexToRgb(colorEntry);
            }
          }
        },
        loadChat: function () {
          ui.onChangeTools('tools-display-tracking', !serverData.user.settings.painting.liveTracking, true);
          ui.onChangeTools('tools-mobile-alt', !alternativeMobileDrawing, true);
          ui.onChangeTools('tools-display-grid', !serverData.user.settings.painting.gridDisplay, true);
          ui.onChangeTools('tools-lock-painting', !serverData.user.settings.painting.lockPainting, true);
          ui.onChangeTools(
            'tools-display-save-tracking',
            !serverData.user.settings.painting.saveTracking,
            true
          );
          ui.onChangeTools(
            'tools-display-protection-flashing',
            !serverData.user.settings.painting.protectionFlashing,
            true
          );
          ui.onChangeTools('tools-display-zoom', !serverData.user.settings.painting.zoomDisplay, true);
          ui.onChangeTools('tools-display-notifications', !serverData.user.settings.chat.notifications, true);
          ui.onChangeTools(
            'tools-display-friends-notifications',
            !serverData.user.settings.chat.friendsNotifications,
            true
          );
          ui.onChangeTools('tools-display-guilds', !serverData.user.settings.chat.guildTags, true);
          ui.onChangeTools('tools-display-timestamp', !serverData.user.settings.chat.timestamps, true);
          ui.onChangeTools('tools-invisible-mode', !serverData.user.settings.chat.invisible, true);
          ui.onChangeTools('tools-display-social', !serverData.user.settings.displaySocial, true);
          canvasRenderer.settingsLoaded = true;
        },
        /**
         * Painting resource-loading boundary. Resource callbacks and loaded/readiness flags determine when rendering and interaction can proceed. Keep loading UI transitions separate from transport connection state and from authentication state.
         *
         * Observed DOM operations: canvasRenderer.element.canvas.painting.removeClass, css.
         */
        loadPainting: function () {
          if (!serverData) {
            return;
          } else {
            if (serverData.painting.nsfw && parseInt(serverData.painting.nsfw) === 1) {
            } else {
              canvasRenderer.element.canvas.painting.removeClass('blur');
            }
            if (parseInt(serverData.painting.id) == 33944) {
              $('#painting').css('background-color', '#0083c7');
            }
            canvasRenderer.loadPalette();
            canvasRenderer.initPaletteRGB();
            var image = new Image(),
              protectionImage = new Image();
            image.onload = function () {
              canvasRenderer.element.ctx.painting.clearRect(
                0,
                0,
                serverData.painting.width,
                serverData.painting.height
              );
              canvasRenderer.element.ctx.painting.fillStyle =
                appState.painting.palette.colors[serverData.painting.background];
              canvasRenderer.element.ctx.painting.fillRect(
                0,
                0,
                serverData.painting.width,
                serverData.painting.height
              );
              canvasRenderer.element.ctx.painting.drawImage(image, 0, 0);
              /**
               * Shared/receiver state written: canvasRenderer.element.ctx.protected.fillStyle, canvasRenderer.x, canvasRenderer.y, canvasRenderer.loaded, enabled, ui.activeAlert.
               *
               * Observed DOM operations: canvasRenderer.element.move.append, canvasRenderer.element.canvas.painting.removeClass, show, hide, addClass, removeClass, css, chat.elem.container.css (plus 3 other observed operations).
               *
               * Scheduled work: setTimeout (3000 ms), setTimeout (1 ms).
               */
              protectionImage.onload = function () {
                canvasRenderer.element.ctx.protected.fillStyle = 'rgba(255, 255, 255, 0)';
                canvasRenderer.element.ctx.protected.clearRect(
                  0,
                  0,
                  serverData.painting.width,
                  serverData.painting.height
                );
                canvasRenderer.element.ctx.protected.drawImage(protectionImage, 0, 0);
                canvasRenderer.element.move.append(canvasRenderer.element.canvas.painting);
                var count = 1;
                canvasRenderer.x = canvasRenderer.width / 2;
                canvasRenderer.y = canvasRenderer.height / 2;
                var viewCoordinates = canvasRenderer.getUrlHash();
                !isNaN(viewCoordinates.s) &&
                  !isNaN(viewCoordinates.x) &&
                  !isNaN(viewCoordinates.y) &&
                  canvasRenderer.centerPositionTo(viewCoordinates.s, viewCoordinates.x, viewCoordinates.y);
                canvasRenderer.element.ctx.protected.fillStyle = 'rgba(255, 255, 255, 0)';
                canvasRenderer.element.ctx.painting.getImageData(pointer.x, pointer.y, 1, 1).data;
                canvasRenderer.loaded = true;
                var knowAboutSpaceBar = localStorage.getItem('know-about-space-bar');
                knowAboutSpaceBar && (enabled = true);
                var lastNewsDismiss = localStorage.getItem('last-news-dismiss');
                (!lastNewsDismiss || lastNewsDismiss !== serverData.news.id) &&
                  setTimeout(
                    /**
                     * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                     *
                     * Observed DOM operations: attr, html, show, css.
                     */
                    function () {
                      $('#chat .snippet').attr('href', serverData.news.url);
                      $('#chat .snippet').find('h1').html(serverData.news.title);
                      $('#chat .snippet').find('.description').html(serverData.news.description);
                      $('#chat .snippet').css('width', '0px').show();
                      $('#chat .snippet').animate({
                        width: $('#chat').width()
                      });
                    },
                    3000
                  );
                if (serverData.painting.nsfw && parseInt(serverData.painting.nsfw) === 1) {
                  ui.activeAlert = true;
                  setTimeout(
                    /**
                     * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                     *
                     * Observed DOM operations: text.
                     */
                    function () {
                      if (parseInt(serverData.painting.id) === 0 || parseInt(serverData.painting.id) === 13) {
                        ui.openModal('alert', 'norules');
                        $('.box[data-id="alert"] .box-header span').text('ANARCHY');
                      } else {
                        ui.openModal('alert', 'nsfw');
                        $('.box[data-id="alert"] .box-header span').text('NSFW');
                      }
                    },
                    1
                  );
                } else {
                  canvasRenderer.element.canvas.painting.removeClass('blur');
                  var welcomeVisible = true,
                    lastVisit = localStorage.getItem('last-visit'),
                    welcomeChoice = localStorage.getItem('welcome-choice'),
                    welcomeTerms = localStorage.getItem('welcome-terms');
                  lastVisit && parseInt(lastVisit) > nowSeconds() - 345600 && (welcomeVisible = false);
                  !welcomeChoice && (welcomeVisible = true);
                  !welcomeTerms && (welcomeVisible = true);
                  welcomeVisible &&
                    (!pointer.touchDevice
                      ? ($('.box-content[data-id="welcome"]').find('.desktop').show(),
                        $('.box-content[data-id="welcome"]').find('.mobile').hide())
                      : ($('.box-content[data-id="welcome"]').find('.desktop').hide(),
                        $('.box-content[data-id="welcome"]').find('.mobile').show()),
                    setTimeout(
                      /**
                       * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                       *
                       * Observed DOM operations: html.
                       */
                      function () {
                        ui.openModal('welcome', 'welcome');
                        $('.ytframe').html(
                          '<iframe src="https://www.youtube.com/embed/QkANwFWvubg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>'
                        );
                      },
                      1
                    ));
                }
                var darkmodeEnabled = localStorage.getItem('darkmode-enabled');
                if (darkmodeEnabled && parseInt(darkmodeEnabled) === 1) {
                  $('body').removeClass('darkmode').addClass('darkmode');
                }
                if (localStorage.getItem('chat-size-w') && localStorage.getItem('chat-size-h')) {
                  var chatSizeW = parseInt(localStorage.getItem('chat-size-w')),
                    chatSizeH = parseInt(localStorage.getItem('chat-size-h')),
                    cssResult = 0,
                    widthCssResult = 0;
                  cssResult = parseInt($('body').css('width'));
                  widthCssResult = parseInt($('body').css('height'));
                  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
                    cssResult = window.innerWidth;
                    widthCssResult = window.innerHeight;
                  } else {
                    cssResult = document.documentElement.clientWidth;
                    widthCssResult = document.documentElement.clientHeight;
                  }
                  if (chatSizeW + 100 > cssResult || chatSizeH + 100 > widthCssResult) {
                    chat.resize(cssResult - 100, 200);
                  } else chat.resize(chatSizeW, chatSizeH);
                } else if (window.innerWidth <= 600) chat.display(false);
                else {
                  var cssResult = parseInt($('body').css('width')),
                    widthCssResult = parseInt($('body').css('height'));
                  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
                    cssResult = window.innerWidth;
                    widthCssResult = window.innerHeight;
                  } else {
                    cssResult = document.documentElement.clientWidth;
                    widthCssResult = document.documentElement.clientHeight;
                  }
                  if (
                    parseInt(chat.elem.container.css('width')) > cssResult - 100 ||
                    parseInt(chat.elem.container.css('height')) > widthCssResult - 100
                  ) {
                    chat.resize(cssResult - 28, 200);
                  } else {
                    chat.resize(
                      parseInt(chat.elem.container.css('width')),
                      parseInt(chat.elem.container.css('height'))
                    );
                  }
                }
                !serverData.user.spinned && openDailyReward();
                var viewCoordinates = window.location.hash;
                if (viewCoordinates != '') {
                  var parts = viewCoordinates.split('=');
                  if (parts[1] !== undefined) {
                    if (parts[0] === '#user') {
                      ui.closeModal();
                      var htmlElement = $('<span style="display:none"></span>');
                      $('body').append(htmlElement);
                      htmlElement.text(parts[1]);
                      clickCallback(htmlElement.text());
                    } else parts[0] === '#auth' && (ui.closeModal(), ui.openModal('auth', 'login'));
                  }
                }
                connectRealtime();
                resizeViewport(true);
                var firstVisit = localStorage.getItem('first-visit');
                !firstVisit &&
                  (localStorage.setItem('first-visit', nowSeconds()), (firstVisit = nowSeconds()));
                var countValue0Setting = 0;
                if (serverData.painting.id == 7) {
                  if (
                    serverData.user.connected &&
                    (parseInt(serverData.user.premium.expire_at) < nowSeconds() ||
                      !serverData.user.premium.active)
                  )
                    countValue0Setting = 1;
                  else if (!serverData.user.connected && localStorage) {
                    if (firstVisit) {
                      parseInt(firstVisit) < nowSeconds() - 120
                        ? (countValue0Setting = 1)
                        : (countValue0Setting = 0);
                    }
                  }
                  if (countValue0Setting > 0) {
                    $('.imp').html(
                      '<div><div class="ablock"><div class="abs"><div class="title">Advertising</div><a href="/api/ad.php?click=1" target="_blank" style="width:270px; height:190px"><img src="/img/ab.gif?cache=' +
                        nowSeconds() +
                        '"></a></div></div></div>'
                    );
                    $('.imp').show();
                    randomInteger(1, 2) == 2 &&
                      ($('.imp').css('top', '1181px'), $('.imp').css('left', '199px'));
                  }
                }
                localStorage.setItem('last-visit', nowSeconds());
                setPageLoading(false);
              };
              if (serverData.painting.protection) {
                var timestamp = nowMilliseconds();
                protectionImage.src =
                  serverData.host.http + 'canvas/' + serverData.painting.id + 'p.png?t200000=' + timestamp;
              } else protectionImage.src = serverData.host.http + 'canvas/0p.png';
            };
            var timestamp = nowMilliseconds();
            image.src =
              serverData.host.http + 'canvas/' + serverData.painting.id + '.png?t200000=' + timestamp;
          }
        },
        /**
         * Placement and replay share this entry point. Browser-initiated placement follows the original account/tool/cooldown checks and the existing outgoing socket format; server-originated updates apply painting/protection data and tracking information. An emitted packet is not itself a server acknowledgement. Keep coordinate, color and command positions stable, including the alternate paths for weapon/image commands.
         *
         * Outgoing socket event names: p, username.
         *
         * Shared/receiver state written: canvasRenderer.pRTime, canvasRenderer.lastPixelPlaced.time, canvasRenderer.lastPixelPlaced.index, canvasRenderer.element.ctx.painting.fillStyle, pixelHistoryByPosition[computed], canvasRenderer.liveTrackingUsers[computed], canvasRenderer.liveTrackingUsers[computed].t, canvasRenderer.liveTrackingUsers[computed].c (plus 1 other observed operations).
         *
         * Observed DOM operations: canvasRenderer.element.move.append, css, show.
         *
         * Input bindings: fromServer, pointerX, pointerY, color, width, userId, command. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* The from-server path updates the rendered canvas; the local path validates client state and sends the existing placement tuple. Payload positions and event names must stay stable. */
        drawPixelAt: function (fromServer, pointerX, pointerY, color, width, userId, command) {
          var timestamp = nowMilliseconds();
          pointerX === undefined && (pointerX = pointer.x);
          pointerY === undefined && (pointerY = pointer.y);
          if (width === undefined) {
            width = canvasRenderer.brush.size;
          }
          color === undefined && (color = canvasRenderer.color);
          if (viewingHistory) return;
          else if (!fromServer && !serverData.user.connected) {
            ui.openModal('auth', 'login');
            return;
          } else if (!fromServer && canvasRenderer.cooldown > timestamp) return;
          else if (
            pointerX < 0 ||
            pointerY < 0 ||
            pointerX > serverData.painting.width - 1 ||
            pointerY > serverData.painting.height - 1
          )
            return;
          else if (
            width <= 1 &&
            !fromServer &&
            canvasRenderer.checkDuplicateFromPainting(pointerX, pointerY, color)
          )
            return;
          else if (!fromServer && canvasRenderer.checkSamePlaceThanLast(pointerX, pointerY, color, width)) {
            return;
          } else if (color !== -100 && $.inArray(color, serverData.painting.palette) === -1) return;
          else if (
            previousTrackedPixel &&
            userId !== 0 &&
            timestamp <= previousTrackedPixel.time &&
            pointerX >= previousTrackedPixel.x &&
            pointerX <= previousTrackedPixel.xLimit &&
            pointerY >= previousTrackedPixel.y &&
            pointerY <= previousTrackedPixel.yLimit
          )
            return;
          else {
            var enabled = true;
            if (serverData.painting.protection) {
              if (
                (canvasRenderer.mode === 0 || canvasRenderer.mode === 4) &&
                canvasRenderer.checkProtectionFromPainting(pointerX, pointerY)
              ) {
                enabled = false;
                return;
              }
            }
            if (!enabled) return;
            else if (!fromServer) {
              if (!command && canvasRenderer.pRTime > timestamp) {
              } else {
                canvasRenderer.pRTime = timestamp + serverData.painting.rate;
                canvasRenderer.lastPixelPlaced.time = timestamp + 100;
                canvasRenderer.lastPixelPlaced.index = pointerX + '-' + pointerY + '-' + color + '-' + width;
                if (
                  canvasRenderer.mode === 1 ||
                  canvasRenderer.mode === 2 ||
                  canvasRenderer.mode === 3 ||
                  canvasRenderer.mode === 4
                ) {
                  if (canvasRenderer.mode === 1 && canvasRenderer.protectionWithBG) {
                    connection.io.volatile.emit('p', [pointerX, pointerY, -100, width, canvasRenderer.mode]);
                  } else
                    connection.io.volatile.emit('p', [pointerX, pointerY, color, width, canvasRenderer.mode]);
                } else {
                  connection.io.volatile.emit('p', [pointerX, pointerY, color, width]);
                }
              }
            } else {
              color === -100
                ? (canvasRenderer.element.ctx.painting.fillStyle = '#cccccc')
                : (canvasRenderer.element.ctx.painting.fillStyle = appState.painting.palette.colors[color]);
              canvasRenderer.element.ctx.painting.fillRect(pointerX, pointerY, width, width);
              if (
                userId !== undefined &&
                userId !== serverData.user.id &&
                serverData.user.settings.painting.saveTracking
              ) {
                pixelHistoryByPosition[pointerX + '-' + pointerY] === undefined &&
                  (pixelHistoryByPosition[pointerX + '-' + pointerY] = []);
                pixelHistoryByPosition[pointerX + '-' + pointerY].push([
                  pointerX,
                  pointerY,
                  color,
                  userId,
                  nowSeconds()
                ]);
                if (trackedUsernames[userId] === undefined) {
                  connection.io.emit('username', userId);
                }
              }
              if (
                userId !== undefined &&
                userId !== serverData.user.id &&
                serverData.user.settings.painting.liveTracking
              ) {
                if (canvasRenderer.liveTrackingUsers[userId] === undefined) {
                  var tNOptions = {};
                  tNOptions.t = timestamp + 4000;
                  tNOptions.n = '';
                  tNOptions.c = color;
                  tNOptions.r = false;
                  canvasRenderer.liveTrackingUsers[userId] = tNOptions;
                  connection.io.emit('username', userId);
                  canvasRenderer.element.move.append(
                    '<div class="track open-profile" style="display:none" data-profile="' +
                      canvasRenderer.liveTrackingUsers[userId].n.toLowerCase() +
                      '" data-id="' +
                      userId +
                      '" style="border-color:' +
                      appState.painting.palette.colors[color] +
                      '">' +
                      canvasRenderer.liveTrackingUsers[userId].n +
                      '</div>'
                  );
                } else if (canvasRenderer.liveTrackingUsers[userId].r) {
                  if (
                    trackedUsername &&
                    canvasRenderer.liveTrackingUsers[userId].n.toLowerCase() !== trackedUsername
                  )
                    return;
                  else {
                    canvasRenderer.liveTrackingUsers[userId].t = timestamp + 4000;
                    canvasRenderer.liveTrackingUsers[userId].c = color;
                    canvasRenderer.element.move.append(
                      '<div class="track open-profile" data-profile="' +
                        canvasRenderer.liveTrackingUsers[userId].n.toLowerCase() +
                        '"  data-id="' +
                        userId +
                        '" style="border-color:' +
                        appState.painting.palette.colors[color] +
                        '">' +
                        canvasRenderer.liveTrackingUsers[userId].n +
                        '</div>'
                    );
                    canvasRenderer.liveTrackingUsers[userId].r = false;
                  }
                } else if (
                  trackedUsername &&
                  canvasRenderer.liveTrackingUsers[userId].n.toLowerCase() !== trackedUsername
                )
                  return;
                else {
                  canvasRenderer.liveTrackingUsers[userId].t = timestamp + 4000;
                  if (canvasRenderer.liveTrackingUsers[userId].c != color) {
                    $(
                      '.track[data-profile="' +
                        canvasRenderer.liveTrackingUsers[userId].n.toLowerCase() +
                        '"]'
                    ).css('border-color', appState.painting.palette.colors[color]);
                  }
                  canvasRenderer.liveTrackingUsers[userId].c = color;
                }
                var styles = {};
                styles.top = pointerY + 1 + 'px';
                styles.left = pointerX + 1 + 'px';
                canvasRenderer.element.move
                  .find('.track[data-id="' + userId + '"]')
                  .css(styles)
                  .show();
              }
            }
          }
        },
        /**
         * Build palette controls from the configured presentation order while retaining the original numeric color identifiers. Selection and disabled/availability states belong to the current painting/account context.
         *
         * Observed DOM operations: html.
         */
        loadPalette: function () {
          if (!serverData) return;
          else {
            var html = '';
            for (var key in appState.painting.palette.order) {
              var orderEntry = appState.painting.palette.order[key];
              if ($.inArray(orderEntry, serverData.painting.palette) !== -1) {
                var colorEntry = appState.painting.palette.colors[orderEntry];
                !serverData.user.premium.active &&
                $.inArray(colorEntry, appState.painting.palette.premium) !== -1
                  ? (html +=
                      '<a href="#" title="' +
                      colorEntry +
                      '" data-id="' +
                      orderEntry +
                      '" style="background-color: ' +
                      colorEntry +
                      '" class="disabled"></a>')
                  : (html +=
                      '<a href="#" title="' +
                      colorEntry +
                      '" data-id="' +
                      orderEntry +
                      '"  style="background-color: ' +
                      colorEntry +
                      '"></a>');
              }
            }
            $('#palette-buttons').html(html);
            var randomPaletteIndex = randomIntegerInclusive(0, serverData.painting.palette.length - 1);
            if (!serverData.user.premium.active) {
              while (
                $.inArray(
                  appState.painting.palette.colors[serverData.painting.palette[randomPaletteIndex]],
                  appState.painting.palette.premium
                ) !== -1
              ) {
                randomPaletteIndex = randomIntegerInclusive(0, serverData.painting.palette.length - 1);
              }
            }
            canvasRenderer.selectPaletteColor(serverData.painting.palette[randomPaletteIndex]);
            $('#palette-buttons')
              .find('a')
              .on(
                'click',
                /**
                 * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
                 *
                 * Observed DOM operations: attr.
                 *
                 * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
                 *
                 * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (event) {
                  event.preventDefault();
                  canvasRenderer.selectPaletteColor(parseInt($(this).attr('data-id')));
                }
              );
          }
        },
        /**
         * Update the selected palette entry and the related cursor/tool appearance through the original availability checks. The selected color is subsequently used by placement; selecting it alone does not send a pixel.
         *
         * Shared/receiver state written: canvasRenderer.color.
         *
         * Observed DOM operations: removeClass, addClass.
         *
         * Input bindings: paletteIndex. Names describe inferred roles; protocol field names are preserved separately.
         */
        selectPaletteColor: function (paletteIndex) {
          $.inArray(paletteIndex, serverData.painting.palette) !== -1 &&
            (!serverData.user.premium.active &&
            $.inArray(appState.painting.palette.colors[paletteIndex], appState.painting.palette.premium) !==
              -1
              ? (ui.openModal('main', 'shop'),
                showNotification(
                  'warning',
                  'Premium Color',
                  'This color is available to Premium subscribers only'
                ))
              : ((canvasRenderer.color = parseInt(paletteIndex)),
                $('#palette-buttons').find('a').removeClass('selected'),
                $('#palette-buttons')
                  .find('a[data-id="' + canvasRenderer.color + '"]')
                  .addClass('selected'),
                pointer.triggerCursor(undefined, canvasRenderer.color)));
        },
        /**
         * Load the selected access-request page/filter and render its results. Pagination/filter fields are sent using the original names. An empty result, a transport failure and a denied operation follow different callback/UI paths.
         *
         * Direct network calls: GET /api/get-painting-access.php?getAccessRequests=true&id= <dynamic suffix>.
         *
         * Shared/receiver state written: canvasRenderer.lastStartAccessFetch.
         *
         * Observed DOM operations: val, rowsElement.html.
         *
         * Input bindings: accessType, offset. Names describe inferred roles; protocol field names are preserved separately.
         */
        fetchPaintingAccess: function (accessType, offset) {
          var rowsElement = ui.activeContent.find('.rows'),
            inputValue = $('input[name="filter-request"][data-type="' + accessType + '"]').val();
          (inputValue === undefined || parseInt(accessType) === 0) && (inputValue = '');
          if (inputValue.length > 0 && inputValue.length <= 2) {
            return;
          }
          if (offset === 0) {
            ui.triggerLoader(true);
            rowsElement.html('');
            canvasRenderer.lastStartAccessFetch = 0;
          }
          api.xhr.req(
            'GET',
            '/api/get-painting-access.php?getAccessRequests=true&id=' +
              serverData.painting.id +
              '&start=' +
              offset +
              '&type=' +
              accessType +
              '&search=' +
              inputValue,
            {},
            true,
            /**
             * HTTP completion callback for /api/get-painting-access.php?getAccessRequests=true&id=. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: loadMoreElement.show, loadMoreElement.text, loadMoreElement.attr, loadMoreElement.removeClass, loadMoreElement.hide, rowsElement.append, text, attr (plus 5 other observed operations).
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              offset === 0 && ui.triggerLoader(false);
              if (success) {
                var loadMoreElement = ui.activeContent.find('.load-more');
                if (response.more) {
                  loadMoreElement.show();
                  loadMoreElement.text(loadMoreElement.attr('data-text'));
                  loadMoreElement.removeAttr('disabled');
                  loadMoreElement.removeClass('spin');
                } else {
                  loadMoreElement.hide();
                }
                for (var key in response.requests) {
                  var requestEntry = response.requests[key],
                    text = '',
                    gETText = '';
                  requestEntry.guild && ((text = '' + requestEntry.guild + ''), (gETText = ' &bull; '));
                  var element = $(
                    '<div class="request-row"><a href="#" class="username open-profile" data-profile=""><span class="guild">' +
                      text +
                      '</span>' +
                      gETText +
                      '<span class="name"></span></a>' +
                      '<div class="stats"></div>' +
                      '<div class="message"></div>' +
                      '<div class="reason"><span class="lastChangeBy"></span><span class="text"></span></div>' +
                      '<div class="reasonTmp"><span class="text c-orange"></span></div>' +
                      '<div class="actions"><a href="#" data-id="' +
                      requestEntry.id +
                      '" data-type="1"></a><a href="#" class="decline banTime"  data-id="' +
                      requestEntry.id +
                      '" data-type="2"></a><a href="#" class="decline permaBan"  data-id="' +
                      requestEntry.id +
                      '" data-type="2"></a></div></div>'
                  );
                  rowsElement.append(element);
                  element.find('.username .name').text(requestEntry.email);
                  element.find('.username').attr('data-profile', requestEntry.email);
                  if (requestEntry.pixels >= 0 && requestEntry.joinDate) {
                    var joinedDate = new Date(requestEntry.joinDate).toLocaleDateString();
                    element
                      .find('.stats')
                      .text(
                        parseInt(requestEntry.pixels).toLocaleString('ru-RU') +
                          ' pixels, joined on ' +
                          joinedDate
                      );
                  } else element.find('.stats').hide();
                  if (requestEntry.message != '') {
                    element.find('.message').text(requestEntry.message);
                  } else element.find('.message').hide();
                  if (accessType === 1) {
                    element.find('a[data-type="2"].banTime').text('TEMP BAN');
                    element.find('a[data-type="2"].permaBan').text('BAN');
                    element.find('a[data-type="1"]').hide();
                    element.find('.stats').hide();
                    if (requestEntry.lastChangeUsername) {
                      element.find('.reason .text').hide();
                      element.find('.reason .lastChangeBy').text(requestEntry.lastChangeUsername);
                      element.find('.reason').show();
                      element
                        .find('.reason .lastChangeBy')
                        .removeClass('c-green')
                        .removeClass('c-red')
                        .addClass('c-green');
                    }
                  } else if (accessType === 2) {
                    element.find('a[data-type="2"]').hide();
                    element.find('a[data-type="1"]').text('GIVE ACCESS');
                    element.find('.stats').hide();
                    if (requestEntry.reason != '') {
                      element.find('.reason .text').text(requestEntry.reason);
                      requestEntry.lastChangeUsername &&
                        element.find('.reason .lastChangeBy').text(requestEntry.lastChangeUsername + ': ');
                      element
                        .find('.reason .lastChangeBy')
                        .removeClass('c-green')
                        .removeClass('c-red')
                        .addClass('c-red');
                      element.find('.reason .text').show();
                      element.find('.reason').show();
                    } else {
                      element.find('.reason').hide();
                    }
                    if (parseInt(requestEntry.daysLeft) > -1) {
                      element.find('.reasonTmp').show();
                      element
                        .find('.reasonTmp .text')
                        .text(
                          '(Temp ban, ' +
                            requestEntry.daysLeft +
                            ' day' +
                            (parseInt(requestEntry.daysLeft) != 1 ? 's' : '') +
                            ' left)'
                        )
                        .show();
                    } else element.find('.reasonTmp').hide();
                  } else {
                    element.find('a[data-type="2"].banTime').hide();
                    element.find('a[data-type="2"].permaBan').text('DECLINE');
                    element.find('a[data-type="1"]').text('ACCEPT');
                  }
                }
                response.requests.length <= 0 && accessType === 0
                  ? (rowsElement.html(
                      '<p class="margin-top"><b>No pending requests.</b><br/><br/>When a user try to place a pixel on your painting, a form will appear to request access.<br/>You will then get a notification each time someone make a new request.</p>'
                    ),
                    $('#form-painting-approve-all-requests').hide())
                  : $('#form-painting-approve-all-requests').show();
              } else {
                showNotification('error', 'Error', response.message);
                ui.closeModal();
                window.location.reload();
              }
            }
          );
        },
        /**
         * Load the painting moderator list and permission controls from the server response. Checkbox presentation reflects returned permission fields; it does not grant permissions without the corresponding server request.
         *
         * Direct network calls: GET /api/get-painting-access.php?getModerators=true&painting= <dynamic suffix>.
         *
         * Observed DOM operations: rowsElement.html.
         */
        fetchPaintingModerators: function () {
          var rowsElement = ui.activeContent.find('.rows');
          ui.triggerLoader(true);
          rowsElement.html('');
          api.xhr.req(
            'GET',
            '/api/get-painting-access.php?getModerators=true&painting=' + serverData.painting.id,
            {},
            true,
            /**
             * HTTP completion callback for /api/get-painting-access.php?getModerators=true&painting=. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: rowsElement.append, hide, text, attr.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              ui.triggerLoader(false);
              if (success)
                for (var key in response) {
                  var moderatorPermissions = response[key],
                    paintingToolsChecked =
                      parseInt(moderatorPermissions.perm_paintingtools) >= 1 ? 'checked' : '',
                    banPermissionChecked = parseInt(moderatorPermissions.perm_ban) >= 1 ? 'checked' : '',
                    element = $(
                      '<div class="request-row"><a href="#" class="username open-profile" data-profile=""><span class="name" ></span></a><div class="perms"><div class="inline-checkbox modPermTools"><input type="checkbox" name="modPermTools" ' +
                        paintingToolsChecked +
                        ' data-username=""><label for="modPermTools">Painting Tools <span class="desc">Access to Protect, Replace & Fill tool</span></label></div>' +
                        '<div class="inline-checkbox modPermBan"><input type="checkbox" name="modPermBan" ' +
                        banPermissionChecked +
                        ' data-username=""><label for="modPermBan">Ban Command <span class="desc">Access to the "/ban USERNAME" and "/unban USERNAME" chat command</span></label></div>' +
                        '</div>' +
                        '<div class="actions"><a href="#" class="remove"  data-id="' +
                        moderatorPermissions.username +
                        '" data-type="10">REMOVE</a></div></div>'
                    );
                  rowsElement.append(element);
                  !serverData.user.settings.painting.isOwner && element.find('.actions .remove').hide();
                  element.find('.username .name').text(moderatorPermissions.username);
                  element.find('[name="modPermTools"]').attr('data-username', moderatorPermissions.username);
                  element.find('[name="modPermBan"]').attr('data-username', moderatorPermissions.username);
                  element.find('.username').attr('data-profile', moderatorPermissions.username);
                }
              else showNotification('error', 'Error', response.message);
            }
          );
        },
        /**
         * Shared/receiver state written: canvasRenderer.paintingListStart.
         *
         * Observed DOM operations: show, paintingsListElement.html, usersElement.html, element.css, element.attr, paintingsListElement.append, text, usersElement.append (plus 3 other observed operations).
         *
         * Input bindings: paintingListStart. Names describe inferred roles; protocol field names are preserved separately.
         */
        refreshPaintingList: function (paintingListStart) {
          ui.triggerLoader(true);
          if (paintingListStart === undefined) {
            paintingListStart = 0;
          }
          var accessFilters = {};
          $('#painting-list .inline-checkbox input').each(
            /**
             * Shared/receiver state written: accessFilters[computed].
             *
             * Observed DOM operations: attr.
             *
             * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
             */
            function () {
              accessFilters[$(this).attr('id')] = false;
            }
          );
          $('#painting-list .inline-checkbox input:checked').each(
            /**
             * Shared/receiver state written: accessFilters[computed].
             *
             * Observed DOM operations: attr.
             *
             * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
             */
            function () {
              accessFilters[$(this).attr('id')] = true;
            }
          );
          var paintingsListElement = ui.activeContent.find('.paintings-list[data-id="pixelplace"]'),
            usersElement = ui.activeContent.find('.paintings-list[data-id="users"]'),
            paintingListCache = canvasRenderer.paintingListCache;
          if (paintingListStart === 0) {
            $('#form-painting-load-more-list').show();
            paintingsListElement.html('');
            usersElement.html('');
            for (var key in paintingListCache.paintings.pixelplace) {
              var pixelplaceEntry = paintingListCache.paintings.pixelplace[key],
                element = $(
                  '<a href="/' +
                    pixelplaceEntry.id +
                    '-' +
                    pixelplaceEntry.slug +
                    '" style="background-color:' +
                    appState.painting.palette.colors[pixelplaceEntry.defaultColor] +
                    '"><div class="name"></div></a>'
                );
              element.css(
                'background-image',
                'url("canvas/' + pixelplaceEntry.id + '.png?t=' + paintingListCache.last_update + '")'
              );
              element.attr('title', pixelplaceEntry.pixelsPlaced + ' pixels placed');
              paintingsListElement.append(element);
              element.find('.name').text(pixelplaceEntry.name);
            }
          }
          var count = 0,
            countValue0Setting = 0,
            enabled = false;
          for (var key in paintingListCache.paintings.users) {
            var pixelplaceEntry = paintingListCache.paintings.users[key];
            if (
              canvasRenderer.paintingListSearch &&
              canvasRenderer.paintingListSearch !== '' &&
              pixelplaceEntry.name.toLowerCase().indexOf(canvasRenderer.paintingListSearch) === -1
            ) {
            } else {
              if (count >= serverData.user.settings.painting.listMaxPaintings) {
                var number = parseInt(key) + 1;
                paintingListCache.paintings.users[number] !== undefined && (enabled = true);
                break;
              }
              var text = '';
              if (pixelplaceEntry.havePremiumSettings && pixelplaceEntry.premiumTime < nowSeconds())
                text = 'bg-disabled';
              else if (pixelplaceEntry.status != '1') text = 'bg-disabled';
              else if (
                pixelplaceEntry.visibility == '2' &&
                parseInt(pixelplaceEntry.guildIntegration) === 1
              ) {
                text = 'bg-guild';
              } else if (
                pixelplaceEntry.visibility == '2' &&
                parseInt(pixelplaceEntry.twitchIntegration) === 1
              )
                text = 'bg-twitch';
              else if (pixelplaceEntry.visibility == '2') text = 'bg-approval';
              else if (pixelplaceEntry.visibility == '3') {
                text = 'bg-owner';
              }
              var paintingFilteredOut = false;
              !accessFilters['filter-1'] &&
                pixelplaceEntry.visibility === '1' &&
                (paintingFilteredOut = true);
              !accessFilters['filter-2'] &&
                pixelplaceEntry.visibility === '2' &&
                (paintingFilteredOut = true);
              !accessFilters['filter-3'] &&
                pixelplaceEntry.visibility === '3' &&
                (paintingFilteredOut = true);
              if (
                !accessFilters['filter-4'] &&
                ((pixelplaceEntry.havePremiumSettings && pixelplaceEntry.premiumTime < nowSeconds()) ||
                  pixelplaceEntry.status !== '1')
              ) {
                paintingFilteredOut = true;
              }
              !accessFilters['filter-5'] && pixelplaceEntry.template === '1' && (paintingFilteredOut = true);
              !accessFilters['filter-6'] && pixelplaceEntry.cooldown !== '0' && (paintingFilteredOut = true);
              if (!paintingFilteredOut) {
                if (countValue0Setting >= paintingListStart) {
                  var aHrefText = '';
                  (parseInt(pixelplaceEntry.id) === 13 ||
                    (pixelplaceEntry.nsfw && parseInt(pixelplaceEntry.nsfw) === 1)) &&
                    (aHrefText = 'blur-bg');
                  var element = $(
                    '<a href="/' +
                      pixelplaceEntry.id +
                      '-' +
                      pixelplaceEntry.slug +
                      '" class="' +
                      text +
                      ' ' +
                      aHrefText +
                      '" style="background-color:' +
                      appState.painting.palette.colors[pixelplaceEntry.defaultColor] +
                      '" title="' +
                      pixelplaceEntry.pixelsPlaced +
                      ' pixels placed"><div class="name"></div></a>'
                  );
                  element.css(
                    'background-image',
                    'url("canvas/' + pixelplaceEntry.id + '.png?t=' + paintingListCache.last_update + '")'
                  );
                  usersElement.append(element);
                  element.find('.name').text(pixelplaceEntry.name);
                  count++;
                }
                countValue0Setting++;
              }
            }
          }
          if (paintingListStart > 0) {
            var formPaintingLoadMoreListElement = $('#form-painting-load-more-list');
            formPaintingLoadMoreListElement
              .find('.submit-form')
              .text(formPaintingLoadMoreListElement.find('.submit-form').attr('data-text'));
            formPaintingLoadMoreListElement.find('.submit-form').removeAttr('disabled');
            formPaintingLoadMoreListElement.find('.submit-form').removeClass('spin');
            canvasRenderer.paintingListStart = paintingListStart;
          }
          if (!enabled) {
            $('#form-painting-load-more-list').hide();
          }
          ui.triggerLoader(false);
        },
        /**
         * Direct network calls: GET /top-paintings.json?t <dynamic suffix>.
         *
         * Outgoing socket event names: hot.paintings.
         *
         * Observed DOM operations: prop.
         */
        loadPaintingList: function () {
          $('#painting-list .inline-checkbox input').prop('checked', true);
          ui.triggerLoader(true);
          var timestamp = nowSeconds();
          connection.io.emit('hot.paintings');
          api.xhr.req(
            'GET',
            '/top-paintings.json?t' + timestamp,
            {},
            true,
            /**
             * HTTP completion callback for /top-paintings.json?t. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Shared/receiver state written: canvasRenderer.paintingListCache, canvasRenderer.paintingListStart.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                canvasRenderer.paintingListCache = response;
                canvasRenderer.paintingListStart = 0;
                canvasRenderer.refreshPaintingList();
              } else {
                ui.triggerLoader(false);
                showNotification('error', 'Error', response.message);
              }
            }
          );
        },
        /**
         * Direct network calls: GET /api/get-my-paintings.php.
         *
         * Observed DOM operations: paintingsListElement.html, hide.
         */
        loadMyPaintings: function () {
          var paintingsListElement = ui.activeContent.find('.paintings-list[data-id="owned"]'),
            html = $(
              '<a href="#" class="display-my-painting-list btn">Display my paintings list</a><br/><a href="#" class="open-modal secondary new-painting create-new-painting-from-list btn" data-target="main" data-content="painting" data-extra="create">Create new Painting</a>'
            );
          paintingsListElement.html(html);
          !serverData.user.connected
            ? ($('.display-my-painting-list').hide(), canvasRenderer.loadPaintingList())
            : api.xhr.req(
                'GET',
                '/api/get-my-paintings.php',
                {},
                true,
                /**
                 * HTTP completion callback for /api/get-my-paintings.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Observed DOM operations: hide, show, element.css, text, addClass.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  if (success) {
                    !response.paintings.length
                      ? $('.display-my-painting-list').hide()
                      : $('.display-my-painting-list').show();
                    for (var key in response.paintings) {
                      var paintingEntry = response.paintings[key],
                        text = '';
                      if (paintingEntry.havePremiumSettings && paintingEntry.premiumTime < nowSeconds()) {
                        text = 'bg-disabled';
                      } else if (paintingEntry.status != '1') {
                        text = 'bg-disabled';
                      } else if (
                        paintingEntry.visibility == '2' &&
                        parseInt(paintingEntry.guildIntegration) === 1
                      )
                        text = 'bg-guild';
                      else if (
                        paintingEntry.visibility == '2' &&
                        parseInt(paintingEntry.twitchIntegration) === 1
                      ) {
                        text = 'bg-twitch';
                      } else if (paintingEntry.visibility == '2') text = 'bg-approval';
                      else if (paintingEntry.visibility == '3') text = 'bg-owner';
                      else paintingEntry.visibility == '4' && (text = 'bg-guild');
                      var element = $(
                        '<a href="/' +
                          paintingEntry.id +
                          '-' +
                          paintingEntry.slug +
                          '" class="' +
                          text +
                          ' my-paintings-list" style="background-color:' +
                          appState.painting.palette.colors[paintingEntry.defaultColor] +
                          '" title="' +
                          paintingEntry.pixelsPlaced +
                          ' pixels placed"><div class="name"></div></a>'
                      );
                      element.css(
                        'background-image',
                        'url("canvas/' + paintingEntry.id + '.png?t=' + paintingEntry.lastPixelPlaced + +'")'
                      );
                      paintingsListElement.prepend(element);
                      element.find('.name').text(paintingEntry.name);
                      parseInt(paintingEntry.xMax) < 205 && element.find('img').addClass('pixelate');
                    }
                  } else showNotification('error', 'Error', response.message);
                  canvasRenderer.loadPaintingList();
                }
              );
        },
        /**
         * Direct network calls: GET /api/get-guild-members.php.
         *
         * Observed DOM operations: selectedElement.html.
         *
         * Input bindings: unusedArgument. Names describe inferred roles; protocol field names are preserved separately.
         */
        loadGuildMembers: function (unusedArgument) {
          var selectedElement = $('#social').find('table');
          if (!serverData.user.connected) {
          } else {
            selectedElement.html(
              '<tr><td><div class="loading-table"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
            );
            api.xhr.req(
              'GET',
              '/api/get-guild-members.php',
              {},
              true,
              /**
               * HTTP completion callback for /api/get-guild-members.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Outgoing socket event names: user.profile.
               *
               * Shared/receiver state written: serverData.guildMembers.
               *
               * Observed DOM operations: selectedElement.html, text, attr, element.attr.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                selectedElement.html('');
                if (success) {
                  serverData.guildMembers = response.members;
                  var count = 0;
                  for (var key in response.members) {
                    var text = response.members[key],
                      gETText = '';
                    if (count === 0) count++;
                    else if (count === 1) {
                      count = 0;
                    }
                    connection.io.emit('user.profile', text);
                    var element = $(
                      '<tr data-online="0" data-username="" ' +
                        gETText +
                        '><td><a href="#" class="open-profile display-block" data-profile=""><div class="offline"></div><span></span></a></td><td class="current-painting">Offline</td><td class="action"><a href="#" class="btn-del-guild-member display-block" data-username=""><img src="/img/icons/i-close-grey.svg" width="10"></a></td></tr>'
                    );
                    selectedElement.prepend(element);
                    element.find('.open-profile span').text(text);
                    element.find('.open-profile').attr('data-profile', text.toLowerCase());
                    element.find('.btn-del-guild-member').attr('data-username', text);
                    element.attr('data-username', text.toLowerCase());
                  }
                  if (selectedElement.html() === '') {
                    if (serverData.user.guild !== '') {
                      selectedElement.prepend(
                        '<tr><td class="text-center hover-bg-white">No members yet :(</td></tr>'
                      );
                    } else
                      selectedElement.prepend(
                        '<tr><td class="text-center ptb-2 hover-bg-white"><a href="#" class="open-modal" data-target="main" data-content="guilds">Join a guild</a></td></tr>'
                      );
                  }
                } else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        },
        /**
         * Direct network calls: GET /api/get-guild-members.php.
         *
         * Observed DOM operations: selectedElement.html.
         *
         * Input bindings: unusedArgument. Names describe inferred roles; protocol field names are preserved separately.
         */
        loadGuildMembersRequests: function (unusedArgument) {
          var selectedElement = $('#social').find('table');
          if (!serverData.user.connected) {
          } else {
            selectedElement.html(
              '<tr><td><div class="loading-table"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
            );
            var requestData = {};
            requestData.requests = true;
            api.xhr.req(
              'GET',
              '/api/get-guild-members.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-guild-members.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Outgoing socket event names: user.profile.
               *
               * Shared/receiver state written: serverData.guildMembers.
               *
               * Observed DOM operations: selectedElement.html, text, attr, element.attr.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                selectedElement.html('');
                if (success) {
                  serverData.guildMembers = response.members;
                  var count = 0;
                  for (var key in response.members) {
                    var text = response.members[key],
                      gETText = '';
                    if (count === 0) count++;
                    else count === 1 && (count = 0);
                    connection.io.emit('user.profile', text);
                    var element = $(
                      '<tr data-online="0" data-username="" ' +
                        gETText +
                        '><td><a href="#" class="open-profile display-block" data-profile=""><div class="offline"></div><span></span></a></td><td class="current-painting">Offline</td><td class="action"><a href="#" class="btn-add-guild-member" data-username=""><img src="/img/icons/i-check.svg" width="10"></a> <a href="#" class="btn-del-guild-member" data-username="" data-extra="denied"><img src="/img/icons/i-close-grey.svg" width="10"></a></td></tr>'
                    );
                    selectedElement.prepend(element);
                    element.find('.open-profile span').text(text);
                    element.find('.open-profile').attr('data-profile', text.toLowerCase());
                    element.find('.btn-del-guild-member').attr('data-username', text);
                    element.find('.btn-add-guild-member').attr('data-username', text);
                    element.attr('data-username', text.toLowerCase());
                  }
                  if (selectedElement.html() === '') {
                    selectedElement.prepend('<tr><td class="text-center">No requests pending</td></tr>');
                  }
                } else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        },
        /**
         * Direct network calls: GET /api/get-my-friends.php.
         *
         * Outgoing socket event names: user.profile.
         *
         * Observed DOM operations: hide, text, selectedElement.html, attr, element.attr.
         *
         * Input bindings: forceRefresh. Names describe inferred roles; protocol field names are preserved separately.
         */
        loadFriends: function (forceRefresh) {
          var selectedElement = $('#social').find('table');
          if (!serverData.user.connected) {
          } else {
            $('#menu-buttons-right-bottom a[data-id="social"] .notification-bubble').text('0').hide();
            selectedElement.html(
              '<tr><td><div class="loading-table"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
            );
            if (!forceRefresh) {
              selectedElement.html('');
              var count = 0;
              for (var key in serverData.user.friends) {
                var text = serverData.user.friends[key],
                  trDataOnlineDataUsernameText = '';
                if (count === 0) count++;
                else if (count === 1) {
                  count = 0;
                }
                connection.io.emit('user.profile', text);
                var element = $(
                  '<tr data-online="0" data-username="" ' +
                    trDataOnlineDataUsernameText +
                    '><td><a href="#" class="open-profile display-block" data-profile=""><div class="offline"></div><span></span></a></td><td class="current-painting">Offline</td><td class="action"><a href="#" class="btn-del-friend display-block" data-username=""><img src="/img/icons/i-close-grey.svg" width="10"></a></td></tr>'
                );
                selectedElement.prepend(element);
                element.find('.open-profile span').text(text);
                element.find('.open-profile').attr('data-profile', text.toLowerCase());
                element.find('.btn-del-friend').attr('data-username', text.toLowerCase());
                element.attr('data-username', text.toLowerCase());
              }
              if (selectedElement.html() === '') {
                selectedElement.prepend(
                  '<tr><td class="text-center hover-bg-white">No player added yet :(</td></tr>'
                );
              }
            } else {
              api.xhr.req(
                'GET',
                '/api/get-my-friends.php',
                {},
                true,
                /**
                 * HTTP completion callback for /api/get-my-friends.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Outgoing socket event names: user.profile.
                 *
                 * Shared/receiver state written: serverData.user.friends.
                 *
                 * Observed DOM operations: selectedElement.html, text, attr, element.attr.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  selectedElement.html('');
                  if (success) {
                    serverData.user.friends = response.users;
                    var count = 0;
                    for (var key in response.users) {
                      var text = response.users[key],
                        gETText = '';
                      if (count === 0) {
                        count++;
                      } else count === 1 && (count = 0);
                      connection.io.emit('user.profile', text);
                      var element = $(
                        '<tr data-online="0" data-username="" ' +
                          gETText +
                          '><td><a href="#" class="open-profile display-block" data-profile=""><div class="offline"></div><span></span></a></td><td class="current-painting">Offline</td><td class="action"><a href="#" class="btn-del-friend display-block" data-username=""><img src="/img/icons/i-close-grey.svg" width="10"></a></td></tr>'
                      );
                      selectedElement.prepend(element);
                      element.find('.open-profile span').text(text);
                      element.find('.open-profile').attr('data-profile', text.toLowerCase());
                      element.find('.btn-del-friend').attr('data-username', text.toLowerCase());
                      element.attr('data-username', text.toLowerCase());
                    }
                    selectedElement.html() === '' &&
                      selectedElement.prepend(
                        '<tr><td class="text-center hover-bg-white">No player added yet :(</td></tr>'
                      );
                  } else {
                    showNotification('error', 'Error', response.message);
                  }
                }
              );
            }
          }
        },
        /**
         * Direct network calls: GET /api/get-my-friends.php.
         *
         * Observed DOM operations: selectedElement.html.
         */
        loadBlocked: function () {
          var selectedElement = $('#social').find('table');
          if (!serverData.user.connected) {
          } else {
            selectedElement.html(
              '<tr><td><div class="loading-table"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
            );
            var requestData = {};
            requestData.type = 1;
            api.xhr.req(
              'GET',
              '/api/get-my-friends.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-my-friends.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: serverData.user.blocked.
               *
               * Observed DOM operations: selectedElement.html, text, attr, htmlElement.attr.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                selectedElement.html('');
                if (success) {
                  serverData.user.blocked = response.users;
                  var count = 0;
                  for (var key in response.users) {
                    var text = response.users[key],
                      unusedItemHtml = '';
                    if (count === 0) {
                      count++;
                    } else count === 1 && (count = 0);
                    var htmlElement = $(
                      '<tr><td><a href="#" class="open-profile display-block" data-profile=""><span></span></a></td><td class="action"><a href="#" class="btn-del-blocked display-block" data-username=""><img src="/img/icons/i-close-grey.svg" width="10"></a></td></tr>'
                    );
                    selectedElement.prepend(htmlElement);
                    htmlElement.find('.open-profile span').text(text);
                    htmlElement.find('.open-profile').attr('data-profile', text.toLowerCase());
                    htmlElement.find('.btn-del-blocked').attr('data-username', text.toLowerCase());
                    htmlElement.attr('data-username', text.toLowerCase());
                  }
                  selectedElement.html() === '' &&
                    selectedElement.prepend(
                      '<tr><td class="text-center hover-bg-white">No blocked users</td></tr>'
                    );
                } else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        },
        /**
         * Direct network calls: GET /api/get-my-items.php.
         *
         * Shared/receiver state written: selectedItemId.
         *
         * Observed DOM operations: elements.cursor.css, elements.cursor.text, removeClass, html, userItemsListElement.html.
         */
        loadUserItems: function () {
          var userItemsListElement = $('.user-items-list');
          selectedItemId = null;
          elements.cursor.css('width', '26px');
          elements.cursor.css('height', '26px');
          elements.cursor.css('padding', '0px');
          elements.cursor.text('');
          $('.select-item-to-use').removeClass('active');
          $('#items-list').html(
            '<div class="loading-table display-block text-center"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
          );
          userItemsListElement.html(
            '<div class="loading-table display-block text-center"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
          );
          api.xhr.req(
            'GET',
            '/api/get-my-items.php',
            {},
            true,
            /**
             * HTTP completion callback for /api/get-my-items.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: html, append, userItemsListElement.html.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                var html = '';
                $('#items-list').html('');
                for (var key in response.items) {
                  if (serverData.shop.items[key] !== undefined) {
                    var text = 'pixelate';
                    (parseInt(key) === 4 ||
                      parseInt(key) === 5 ||
                      parseInt(key) === 6 ||
                      parseInt(key) === 10 ||
                      parseInt(key) === 11 ||
                      parseInt(key) === 12) &&
                      (text = '');
                    var itemImageExtension = 'png',
                      gETText = '';
                    if (parseInt(key) === 6 || parseInt(key) === 10 || parseInt(key) === 12) {
                      itemImageExtension = 'gif';
                      gETText = 'bg-white';
                    }
                    if (parseInt(response.items[key]) > 0) {
                      html +=
                        '<div class="prem-item" data-item="' +
                        key +
                        '">' +
                        '<div class="title">' +
                        serverData.shop.items[key].name +
                        '</div>' +
                        '<div class="logo ' +
                        gETText +
                        '"><img src="/img/item-' +
                        key +
                        '.' +
                        itemImageExtension +
                        '?v=4"  class="' +
                        text +
                        '"><div class="count">x' +
                        response.items[key] +
                        '</div></div>' +
                        '<button class="how-to-item" data-item="' +
                        key +
                        '">USE</button><button class="gift-item" data-item="' +
                        key +
                        '">GIFT</button>' +
                        '</div>';
                    }
                    if (serverData.shop.items[key].type === 1) {
                      var itemButtonClass = 'select-item-to-use';
                      parseInt(response.items[key]) <= 0 && (itemButtonClass = 'open-item');
                      $('#items-list').append(
                        '<button class="' +
                          itemButtonClass +
                          '" data-item="' +
                          key +
                          '"><img src="/img/item-' +
                          key +
                          '.' +
                          itemImageExtension +
                          '?v=4" class="' +
                          text +
                          '"><div class="stack">' +
                          response.items[key] +
                          '</div></button>'
                      );
                    }
                  }
                }
                html === '' && (html = '<p>No items in your inventory.</p>');
                userItemsListElement.html(html);
              } else {
                userItemsListElement.html('');
                showNotification('error', 'Error', response.message);
              }
            }
          );
        },
        /**
         * Direct network calls: GET /api/get-claims.php.
         *
         * Observed DOM operations: removeClass, text.
         */
        loadFreeCoins: function () {
          $('.claim-coin').removeClass('disabled');
          $('.claim-coin span').text('');
          api.xhr.req(
            'GET',
            '/api/get-claims.php',
            {},
            true,
            /**
             * HTTP completion callback for /api/get-claims.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: addClass, text.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                for (var key in response.claims) {
                  var claimEntry = response.claims[key];
                  $('.claim-coins[data-id="' + claimEntry.claim_id + '"]').addClass('disabled');
                  $('.claim-coins[data-id="' + claimEntry.claim_id + '"] span').text('Already Claimed');
                }
              } else {
                showNotification('error', 'Error', response.message);
              }
            }
          );
        },
        /**
         * Follow the original selected-item, account, protection and war-state branches before the server-facing item action. A client-side confirmation or UI change is not proof that the server accepted the action.
         *
         * Direct network calls: POST /api/post-shop.php.
         *
         * Shared/receiver state written: canvasRenderer.tryingToUseWeapon, selectedItemId.
         *
         * Input bindings: item. Names describe inferred roles; protocol field names are preserved separately.
         */
        useWeapon: function (item) {
          if (!serverData.user.connected) {
          } else if (timestamp > nowSeconds() - 1) {
            showNotification('error', 'Error', 'Please wait 1 sec between each weapon use');
          } else if (canvasRenderer.tryingToUseWeapon) {
          } else if (warActive) showNotification('error', 'Cannot use weapons during a Guild/Player war');
          else if (
            serverData.painting.protection &&
            canvasRenderer.mode === 0 &&
            canvasRenderer.checkProtectionFromPainting(pointer.x, pointer.y)
          ) {
          } else {
            canvasRenderer.tryingToUseWeapon = true;
            var position = {};
            position.use = true;
            position.x = pointer.x;
            position.y = pointer.y;
            position.painting = serverData.painting.id;
            position.item = selectedItemId;
            position.color = canvasRenderer.color;
            position.zoom = canvasRenderer.scale;
            var requestData = position;
            item !== undefined && (requestData.item = item);
            if (pointer.touchDevice) {
              selectedItemId = null;
            }
            api.xhr.req(
              'POST',
              '/api/post-shop.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-shop.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Scheduled work: setTimeout (1000 ms).
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                setTimeout(
                  /**
                   * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                   *
                   * Shared/receiver state written: canvasRenderer.tryingToUseWeapon.
                   */
                  function () {
                    canvasRenderer.tryingToUseWeapon = false;
                  },
                  1000
                );
                success
                  ? canvasRenderer.loadUserItems()
                  : showNotification('error', 'Error', response.message);
              }
            );
          }
        },
        /**
         * Submit the selected inventory item through its existing request and callback path. Inventory/UI updates occur according to the returned result, rather than being invented by this commented reference.
         *
         * Direct network calls: POST /api/post-shop.php.
         *
         * Input bindings: item. Names describe inferred roles; protocol field names are preserved separately.
         */
        useItem: function (item) {
          if (!serverData.user.connected) {
          } else {
            var weaponRequest = {};
            weaponRequest.use = true;
            weaponRequest.painting = serverData.painting.id;
            weaponRequest.item = selectedItemId;
            weaponRequest.color = 1;
            var requestData = weaponRequest;
            item !== undefined && (requestData.item = item);
            if (requestData.item === 9) {
              var username = prompt('Enter a new username');
              username && (requestData.username = username);
            }
            api.xhr.req(
              'POST',
              '/api/post-shop.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-shop.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Scheduled work: setTimeout (4000 ms).
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  canvasRenderer.loadUserItems();
                  if (requestData.item === 9) {
                    showNotification('success', 'New username set. Reloading the page in a few seconds..');
                    setTimeout(function () {
                      window.location.reload();
                    }, 4000);
                  }
                } else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        },
        /**
         * Execute the original local account/session reset and navigation path. Clearing browser state and disconnecting transport are distinct effects; preserve the branch-specific order.
         *
         * Shared/receiver state written: serverData.user.connected, serverData.user.name, serverData.user.guild, serverData.user.premium.active, serverData.user.premium.expire_at, serverData.user.icons, serverData.user.social.discord.linked, serverData.user.social.discord.name (plus 5 other observed operations).
         *
         * Observed DOM operations: Cookies.remove.
         */
        disconnectUser: function () {
          serverData.user.connected = false;
          serverData.user.name = 'Guest';
          serverData.user.guild = '';
          serverData.user.premium.active = false;
          serverData.user.premium.expire_at = 0;
          serverData.user.icons = [];
          serverData.user.social.discord.linked = false;
          serverData.user.social.discord.name = '';
          serverData.user.social.reddit.linked = false;
          serverData.user.social.reddit.name = '';
          serverData.user.social.twitch.linked = false;
          serverData.user.social.twitch.name = '';
          serverData.user.id = null;
          var pathData = {};
          pathData.path = '';
          Cookies.remove('authId', pathData);
          var pathPathData = {};
          pathPathData.path = '';
          Cookies.remove('authKey', pathPathData);
          var localPathPathData = {};
          localPathPathData.path = '';
          Cookies.remove('authToken', localPathPathData);
        }
      };
      $(document).on(
        'click',
        '.display-my-painting-list',
        /**
         * Registered click callback delegated to ".display-my-painting-list". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: removeClass, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.my-paintings-list').removeClass('my-paintings-list');
          $('.display-my-painting-list').hide();
        }
      );
      setInterval(
        /**
         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
         *
         * Shared/receiver state written: canvasRenderer.liveTrackingUsers[computed].r, trackingExpiresAt, trackedUsername.
         *
         * Observed DOM operations: saveTrackingButton.attr, saveTrackingButton.hide, remove.
         */
        function () {
          if (serverData.user.settings.painting.saveTracking) {
            var time = parseInt(saveTrackingButton.attr('data-time'));
            time < nowSeconds() - 5 && saveTrackingButton.hide();
          }
          if (serverData.user.settings.painting.liveTracking) {
            var timestamp = nowMilliseconds(),
              trackingCutoff = timestamp - 60000;
            for (var key in canvasRenderer.liveTrackingUsers) {
              if (canvasRenderer.liveTrackingUsers[key].t < trackingCutoff) {
                canvasRenderer.element.move.find('.track[data-id="' + key + '"]').remove();
                delete canvasRenderer.liveTrackingUsers[key];
              } else if (canvasRenderer.liveTrackingUsers[key].t < timestamp) {
                if (!canvasRenderer.liveTrackingUsers[key].r) {
                  canvasRenderer.liveTrackingUsers[key].r = true;
                  canvasRenderer.element.move.find('.track[data-id="' + key + '"]').remove();
                }
              }
            }
          }
          if (trackingExpiresAt > 0 && trackingExpiresAt < nowSeconds()) {
            trackingExpiresAt = 0;
            trackedUsername = null;
            var messageData = {};
            messageData.type = 'system';
            messageData.message = 'Tracking filter expired';
            chat.addMessageRow(messageData);
          }
        },
        1000
      );
      var previousTrackedPixel = null;
      /**
       * Shared/receiver state written: previousTrackedPixel.
       *
       * Observed DOM operations: append, htmlElement.css.
       *
       * Input bindings: weaponType, x, y, unusedArgument. Names describe inferred roles; protocol field names are preserved separately.
       */
      function animateWeaponEffect(weaponType, x, y, unusedArgument) {
        var enabled = false,
          count = 0,
          effectDuration = 0;
        if (weaponType === 1) {
          enabled = true;
          count = 35;
          effectDuration = 6000;
        } else if (weaponType === 2) {
          enabled = true;
          count = 75;
          effectDuration = 6000;
        } else if (weaponType === 3) {
          enabled = true;
          count = 125;
          effectDuration = 6000;
        }
        var id = nowMilliseconds(),
          position = {};
        position.id = id;
        position.x = Math.round(x - count / 2);
        position.y = Math.round(y - count / 2);
        position.xLimit = Math.ceil(x + count / 2);
        position.yLimit = Math.ceil(y + count / 2);
        position.time = id + effectDuration;
        previousTrackedPixel = position;
        weaponType !== 2 && (previousTrackedPixel.xLimit++, previousTrackedPixel.yLimit++);
        var unusedEffectOptions = id;
        if (enabled) {
          var htmlElement = $('<div class="bomb"></div>');
          $('#painting-move').append(htmlElement);
          var number = Math.round(count * 2.5),
            mathRound = Math.round(x - number / 2),
            mathRoundY = Math.round(y - number / 2);
          htmlElement.css('top', mathRoundY + 'px');
          htmlElement.css('left', mathRound + 'px');
          var image = new Image();
          /**
           * Observed DOM operations: htmlElement.html.
           *
           * Scheduled work: setTimeout (3000 ms).
           */
          image.onload = function () {
            htmlElement.html(
              '<img src="/img/exp1.gif?v=' + nowMilliseconds() + '" width="' + number + '" class="pixelate">'
            );
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Observed DOM operations: htmlElement.remove.
               */
              function () {
                htmlElement.remove();
              },
              3000
            );
          };
          image.src = '/img/exp1.gif?v1';
        }
      }
      /**
       * Shared/receiver state written: previousTrackedPixel.
       *
       * Scheduled work: requestAnimationFrame, setTimeout.
       *
       * Input bindings: argument, diameter, centerX, centerY, maximumDiameter, color, rounded, phase, originalColor, effectId. Names describe inferred roles; protocol field names are preserved separately.
       */
      function callback(
        argument,
        diameter,
        centerX,
        centerY,
        maximumDiameter,
        color,
        rounded,
        phase,
        originalColor,
        effectId
      ) {
        if (effectId < nowMilliseconds() - 10000) return;
        argument++;
        if (argument >= diameter * 2) {
          diameter += 2;
          fillWeaponArea(diameter, centerX, centerY, color, rounded);
        }
        if (diameter <= maximumDiameter) {
          diameter > maximumDiameter - 5 && (rounded = false);
          window.requestAnimationFrame(function () {
            callback(
              argument,
              diameter,
              centerX,
              centerY,
              maximumDiameter,
              color,
              rounded,
              phase,
              originalColor,
              effectId
            );
          });
        } else if (phase === 1) {
          argument = 0;
          diameter = 0;
          color = 5;
          phase = 2;
          window.requestAnimationFrame(function () {
            callback(
              argument,
              diameter,
              centerX,
              centerY,
              maximumDiameter,
              color,
              rounded,
              phase,
              originalColor,
              effectId
            );
          });
        } else if (phase === 2) {
          argument = 0;
          diameter = 0;
          color = originalColor;
          phase = 3;
          window.requestAnimationFrame(function () {
            callback(
              argument,
              diameter,
              centerX,
              centerY,
              maximumDiameter,
              color,
              rounded,
              phase,
              originalColor,
              effectId
            );
          });
        } else if (phase === 3) {
          if (previousTrackedPixel && previousTrackedPixel.id === effectId) {
            if (previousTrackedPixel.time + 100 > nowMilliseconds()) {
              setTimeout(
                /**
                 * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                 *
                 * Shared/receiver state written: previousTrackedPixel.
                 */
                function () {
                  previousTrackedPixel &&
                    previousTrackedPixel.id === effectId &&
                    (previousTrackedPixel = null);
                },
                previousTrackedPixel.time - nowMilliseconds()
              );
            } else previousTrackedPixel = null;
          }
        }
      }
      function fillWeaponArea(argument, centerX, centerY, color, rounded) {
        var count = 1,
          startX = centerX - argument / 2,
          startY = centerY - argument / 2;
        while (count <= argument) {
          var countValue1Setting = 1,
            value = argument;
          if (rounded && argument > 8) {
            if (count === 1) {
              countValue1Setting = 6;
              value = argument - 5;
            } else if (count === 2) {
              countValue1Setting = 5;
              value = argument - 4;
            } else if (count === 3) {
              countValue1Setting = 4;
              value = argument - 3;
            } else if (count === 4) {
              countValue1Setting = 3;
              value = argument - 2;
            } else if (count === 5) {
              countValue1Setting = 2;
              value = argument - 1;
            } else if (count === argument) {
              countValue1Setting = 6;
              value = argument - 5;
            } else if (count === argument - 1) {
              countValue1Setting = 5;
              value = argument - 4;
            } else if (count === argument - 2) {
              countValue1Setting = 4;
              value = argument - 3;
            } else if (count === argument - 3) {
              countValue1Setting = 3;
              value = argument - 2;
            } else if (count === argument - 4) {
              countValue1Setting = 2;
              value = argument - 1;
            }
          } else if (rounded && argument > 4) {
            if (count === 1) {
              countValue1Setting = 3;
              value = argument - 2;
            } else if (count === 2) {
              countValue1Setting = 2;
              value = argument - 1;
            } else if (count === argument) {
              countValue1Setting = 3;
              value = argument - 2;
            } else count === argument - 1 && ((countValue1Setting = 2), (value = argument - 1));
          }
          while (countValue1Setting <= value) {
            canvasRenderer.drawPixelAt(true, startX + countValue1Setting, startY + count, color, 1, 0);
            countValue1Setting++;
          }
          count++;
        }
      }
      canvasRenderer.element.canvas.painting = $(document.createElement('canvas'));
      canvasRenderer.element.canvas.painting[0].width = serverData.painting.width;
      canvasRenderer.element.canvas.painting[0].height = serverData.painting.height;
      canvasRenderer.element.canvas.painting[0].style.width = serverData.painting.width + 'px';
      canvasRenderer.element.canvas.painting[0].style.height = serverData.painting.height + 'px';
      canvasRenderer.element.canvas.painting[0].setAttribute('id', 'canvas');
      canvasRenderer.element.canvas.painting[0].setAttribute('tabindex', '1');
      canvasRenderer.element.canvas.painting[0].setAttribute('class', 'pixelate no-select blur');
      canvasRenderer.element.ctx.painting = canvasRenderer.element.canvas.painting[0].getContext('2d');
      canvasRenderer.element.ctx.painting.fillStyle = '#FFFFFF';
      canvasRenderer.element.ctx.painting.fillRect(
        0,
        0,
        serverData.painting.width,
        serverData.painting.height
      );
      canvasRenderer.element.canvas.protected = $(document.createElement('canvas'));
      canvasRenderer.element.canvas.protected[0].width = serverData.painting.width;
      canvasRenderer.element.canvas.protected[0].height = serverData.painting.height;
      canvasRenderer.element.canvas.protected[0].style.width = serverData.painting.width + 'px';
      canvasRenderer.element.canvas.protected[0].style.height = serverData.painting.height + 'px';
      canvasRenderer.element.ctx.protected = canvasRenderer.element.canvas.protected[0].getContext('2d');
      canvasRenderer.element.ctx.protected.fillStyle = '#FFFFFF';
      canvasRenderer.element.ctx.protected.fillRect(
        0,
        0,
        serverData.painting.width,
        serverData.painting.height
      );
      var panGestureOptions = {};
      panGestureOptions.inertia = true;
      panGestureOptions.onmove = function (gesture) {
        if (imagePainter.position.dragging) return;
        else if (serverData.user.settings.painting.lockPainting) return;
        else if (!canvasRenderer.loaded) return;
        else if (ui.activeElement) return;
        else if (ui.activeElement) return;
        else {
          if (!alternativeMobileDrawing && pointer.touchDevice) {
            pointer.setCursorPosition();
            if (pointer.mobileBrushActivated) {
              canvasRenderer.drawPixelAt();
            }
          }
          canvasRenderer.x += gesture.dx / canvasRenderer.scale;
          canvasRenderer.y += gesture.dy / canvasRenderer.scale;
          canvasRenderer.updateScaleAndPosition();
        }
      };
      panGestureOptions.onend = function (unusedEvent) {
        if (imagePainter.position.dragging) return;
        else if (serverData.user.settings.painting.lockPainting) return;
        else if (!canvasRenderer.loaded) return;
        else if (ui.activeElement) {
          return;
        } else {
          canvasRenderer.updateUrlHash();
        }
      };
      var pinchGestureOptions = {};
      pinchGestureOptions.onmove = function (gesture) {
        if (serverData.user.settings.painting.lockPainting) return;
        else if (!canvasRenderer.loaded) return;
        else if (ui.activeElement) {
          return;
        } else {
          canvasRenderer.scale = canvasRenderer.formatScale(canvasRenderer.scale * (1 + gesture.ds));
          canvasRenderer.updateScaleAndPosition();
        }
      };
      pinchGestureOptions.onend = function (unusedEvent) {
        if (serverData.user.settings.painting.lockPainting) return;
        else if (!canvasRenderer.loaded) {
          return;
        } else if (ui.activeElement) {
          return;
        } else canvasRenderer.updateUrlHash();
      };
      interact('#painting').styleCursor(false).draggable(panGestureOptions).gesturable(pinchGestureOptions);
      var wheelListenerOptions = {};
      wheelListenerOptions.passive = true;
      canvasRenderer.element.painting[0].addEventListener(
        'wheel',
        /**
         * Registered wheel callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: canvasRenderer.scale, canvasRenderer.x, canvasRenderer.y.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (!canvasRenderer.loaded) return;
          else if (ui.activeElement) return;
          else {
            var scale = canvasRenderer.scale;
            canvasRenderer.scale = canvasRenderer.formatScale(
              event.deltaY > 0 ? canvasRenderer.scale / 1.5 : canvasRenderer.scale * 1.5
            );
            var clientX = event.clientX - canvasRenderer.element.painting.width() / 2,
              clientY = event.clientY - canvasRenderer.element.painting.height() / 2;
            canvasRenderer.x -= clientX / scale;
            canvasRenderer.x += clientX / canvasRenderer.scale;
            canvasRenderer.y -= clientY / scale;
            canvasRenderer.y += clientY / canvasRenderer.scale;
            canvasRenderer.updateScaleAndPosition();
            canvasRenderer.updateUrlHash();
            pointer.setCursorPosition(event);
          }
        },
        wheelListenerOptions
      );
      /* Compensate the painting offset when changing scale so the viewport center remains over the same canvas position. */
      function zoomAroundViewportCenter(zoomIn) {
        var scale = canvasRenderer.scale;
        zoomIn
          ? (canvasRenderer.scale = canvasRenderer.formatScale(canvasRenderer.scale * 1.5))
          : (canvasRenderer.scale = canvasRenderer.formatScale(canvasRenderer.scale / 1.5));
        var centerOffsetX = $(window).width() / 2 - canvasRenderer.element.painting.width() / 2,
          centerOffsetY = $(window).height() / 2 - canvasRenderer.element.painting.height() / 2;
        canvasRenderer.x -= centerOffsetX / scale;
        canvasRenderer.x += centerOffsetX / canvasRenderer.scale;
        canvasRenderer.y -= centerOffsetY / scale;
        canvasRenderer.y += centerOffsetY / canvasRenderer.scale;
        canvasRenderer.updateScaleAndPosition();
        canvasRenderer.updateUrlHash();
        if (pointer.touchDevice) {
          pointer.setCursorPosition();
        }
      }
      $('#menu-buttons-right-top a[data-id="zoom-in"], #menu-buttons-right-top a[data-id="zoom-out"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (!canvasRenderer.loaded) return;
          else if (ui.activeElement) return;
          else zoomAroundViewportCenter($(this).attr('data-id') === 'zoom-in');
        }
      );
      $(document).on('contextmenu', function (event) {
        if (
          !ui.activeElement &&
          !chat.inputActive &&
          $(event.target).closest('#chat .messages').length <= 0
        ) {
          event.preventDefault();
        }
      });
      var clientX,
        clientY,
        scale,
        value,
        handleTouchStart = function (event) {
          value = true;
          clientX = event.clientX;
          clientY = event.clientY;
          scale = canvasRenderer.scale;
        },
        repeatedPlacementActive = false,
        countValue0Setting = 0,
        unusedState = null,
        localCountValue0Setting = 0,
        branchCountValue0Setting = 0,
        branchLocalCountValue0Setting = 0,
        alternateCountValue0Setting = 0,
        countValue1Setting = 1,
        alternateLocalCountValue0Setting = 0,
        alternateBranchCountValue0Setting = 0,
        alternateBranchLocalCountValue0Setting = 0;
      /**
       * Shared/receiver state written: countValue0Setting.
       *
       * Scheduled work: requestAnimationFrame.
       *
       * Input bindings: argument. Names describe inferred roles; protocol field names are preserved separately.
       */
      function renderRateLimitedPlacement(argument) {
        if (argument - countValue0Setting >= serverData.painting.rate * 1.5) {
          countValue0Setting = argument;
          placeCursorPixel();
        }
        if (repeatedPlacementActive) {
          window.requestAnimationFrame(renderRateLimitedPlacement);
        }
      }
      function placeCursorPixel() {
        canvasRenderer.drawPixelAt(
          false,
          localCountValue0Setting + 1 + branchLocalCountValue0Setting,
          branchCountValue0Setting + 1 - alternateCountValue0Setting,
          canvasRenderer.color,
          1,
          undefined,
          true
        );
        if (countValue1Setting > 0) {
          if (branchLocalCountValue0Setting > alternateBranchCountValue0Setting) {
            countValue1Setting = 0;
            alternateLocalCountValue0Setting = 1;
          }
        } else if (alternateLocalCountValue0Setting > 0)
          alternateCountValue0Setting > alternateBranchLocalCountValue0Setting &&
            ((countValue1Setting = -1), (alternateLocalCountValue0Setting = 0));
        else if (countValue1Setting < 0) {
          if (branchLocalCountValue0Setting < -1 * alternateBranchCountValue0Setting) {
            countValue1Setting = 0;
            alternateLocalCountValue0Setting = -1;
          }
        } else if (alternateLocalCountValue0Setting < 0) {
          if (alternateCountValue0Setting < -1 * alternateBranchLocalCountValue0Setting) {
            countValue1Setting = 1;
            alternateLocalCountValue0Setting = 0;
            alternateBranchCountValue0Setting += 1;
            alternateBranchLocalCountValue0Setting += 1;
          }
        }
        branchLocalCountValue0Setting += countValue1Setting;
        alternateCountValue0Setting += alternateLocalCountValue0Setting;
      }
      var handleTouchMove = function (event) {
        if (value) {
          value = false;
          var mathAbs = Math.abs(clientX - event.clientX),
            mathAbsClientY = Math.abs(clientY - event.clientY);
          if (mathAbs < 5 && mathAbsClientY < 5 && scale === canvasRenderer.scale) {
            if (event.originalEvent) {
              event.preventDefault();
              if (selectedItemId !== null) canvasRenderer.useWeapon();
              else {
                if (!enabled) {
                  if (count > 5) {
                    enabled = true;
                    localStorage.setItem('know-about-space-bar', true);
                    showNotification('info', 'Tip: Hold [SPACE BAR] to draw faster!');
                  } else count++;
                }
                canvasRenderer.drawPixelAt();
              }
            }
          }
        }
      };
      canvasRenderer.element.canvas.painting
        .add(canvasRenderer.element.canvas.protected)
        .add($('#areas'))
        .on('pointerdown', function (event) {
          if (!canvasRenderer.loaded) return;
          else if (ui.activeElement) return;
          else if (!pointer.touchDevice) {
            if (event.which === 1 || event.button === 0) {
              !chat.altActive && !chat.shiftActive && handleTouchStart(event);
            }
          }
        });
      canvasRenderer.element.painting.on(
        'pointerup',
        /**
         * Registered pointerup callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: setIntervalResult.
         *
         * Observed DOM operations: saveTrackingButton.hide, saveTrackingButton.attr, show, html, saveTrackingButton.css.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (!canvasRenderer.loaded) return;
          else if (ui.activeElement) return;
          else if (!pointer.touchDevice) {
            if (event.which === 1 || event.button === 0) {
              if (chat.altActive) {
                event.preventDefault();
                canvasRenderer.getColorFromPainting(pointer.x, pointer.y);
                setIntervalResult !== null && (clearInterval(setIntervalResult), (setIntervalResult = null));
              } else if (chat.shiftActive) {
                if (pixelHistoryByPosition[pointer.x + '-' + pointer.y] !== undefined) {
                  var html = '';
                  for (var key in pixelHistoryByPosition[pointer.x + '-' + pointer.y]) {
                    var trackingEntry = pixelHistoryByPosition[pointer.x + '-' + pointer.y][key],
                      timestamp = parseInt(Math.ceil(nowSeconds() - parseInt(trackingEntry[4])) / 60),
                      trackedUsernameEntry = 'Loading...';
                    trackedUsernames[trackingEntry[3]] !== undefined &&
                      (trackedUsernameEntry = trackedUsernames[trackingEntry[3]]);
                    html +=
                      '<li data-id="' +
                      trackingEntry[3] +
                      '"><a href="#" class="username open-profile" data-profile="' +
                      trackedUsernameEntry +
                      '"  style="color:' +
                      appState.painting.palette.colors[trackingEntry[2]] +
                      '!important;">' +
                      trackedUsernameEntry +
                      '</a> ' +
                      timestamp +
                      'm ago</li>';
                  }
                  if (html === '') {
                    saveTrackingButton.hide();
                  } else {
                    html = '<ul>' + html;
                    html += '</ul>';
                    saveTrackingButton.attr('data-time', nowSeconds());
                    var styles = {};
                    styles.top = parseInt(pointer.y) + 'px';
                    styles.left = parseInt(pointer.x) + 'px';
                    saveTrackingButton.css(styles).html(html).show();
                  }
                } else saveTrackingButton.hide();
              } else handleTouchMove(event);
            } else
              (event.which === 2 || event.button === 1) &&
                (event.preventDefault(), canvasRenderer.getColorFromPainting(pointer.x, pointer.y));
          }
        }
      );
      var pointerPosition = {};
      canvasRenderer.element.canvas.painting
        .add(canvasRenderer.element.canvas.protected)
        .add($('#areas'))
        .on(
          'touchstart',
          /**
           * Registered touchstart callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
           *
           * Shared/receiver state written: pointerPosition.
           *
           * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (event) {
            if (!pointer.touchDevice) return;
            else if (!canvasRenderer.loaded) {
              return;
            } else if (ui.activeElement) return;
            else if (alternativeMobileDrawing) {
              if (event.touches.length == 1) {
                event = normalizePointerEvent(event);
                var position = {};
                position.x = event.pageX;
                position.y = event.pageY;
                position.s = canvasRenderer.scale;
                pointerPosition = position;
              }
            } else if (event.touches.length == 1) {
              event = normalizePointerEvent(event);
              pointer.setCursorPosition(event);
            }
          }
        );
      canvasRenderer.element.canvas.painting
        .add(canvasRenderer.element.canvas.protected)
        .add($('#areas'))
        .on('touchend', function (event) {
          if (!alternativeMobileDrawing) {
            return;
          } else if (!canvasRenderer.loaded) return;
          else if (ui.activeElement) return;
          else if (pointer.touchDevice) {
            if (event.touches.length <= 1) {
              event = normalizePointerEvent(event);
              if (
                pointerPosition.x > event.pageX + 10 ||
                pointerPosition.x < event.pageX - 10 ||
                pointerPosition.y > event.pageY + 10 ||
                pointerPosition.y < event.pageY - 10 ||
                pointerPosition.s != canvasRenderer.scale
              )
                return;
              else {
                pointer.setCursorPosition(event);
                if (selectedItemId !== null) {
                  if (confirm('Use ' + serverData.shop.items[selectedItemId].name + ' at this position?')) {
                    canvasRenderer.useWeapon();
                  }
                } else {
                  canvasRenderer.drawPixelAt();
                }
              }
            }
          }
        });
      $('#painting-list .inline-checkbox input:checked').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: canvasRenderer.paintingListStart.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          canvasRenderer.paintingListStart = 0;
          canvasRenderer.refreshPaintingList();
        }
      );
      var chatElements = {};
      chatElements.container = $('#chat');
      chatElements.online = $('#chat .online');
      chatElements.onlineValue = $('#chat .online .value');
      chatElements.onlineSubValue = $('#chat .online .sub-value');
      chatElements.input = $('#chat input[name="chat"]');
      chatElements.messages = {};
      chatElements.button = {};
      chatElements.button.collapsed = $('#menu-buttons-bottom a[data-id="chat"]');
      chatElements.button.hide = $('#chat .buttons a[data-id="hide"]');
      chatElements.button.resize = $('#chat .buttons a[data-id="resize"]');
      chatElements.button.backToBottom = $('#chat .back-to-bottom');
      chatElements.button.global = $('#chat .tabs a[data-id="global"]');
      chatElements.button.painting = $('#chat .tabs a[data-id="painting"]');
      chatElements.button.nonenglish = $('#chat .tabs a[data-id="nonenglish"]');
      chatElements.button.guild = $('#chat .tabs a[data-id="guild"]');
      chatElements.button.whispers = $('#chat .tabs a[data-id="whispers"]');
      chatElements.messages.global = $('#chat .messages[data-id="global"]');
      chatElements.messages.painting = $('#chat .messages[data-id="painting"]');
      chatElements.messages.nonenglish = $('#chat .messages[data-id="nonenglish"]');
      chatElements.messages.guild = $('#chat .messages[data-id="guild"]');
      chatElements.messages.whispers = $('#chat .messages[data-id="whispers"]');
      /* Keep channel visibility, unread counts, message rendering, and outgoing command handling together. */
      var chat = {
        elem: chatElements,
        startLoaded: false,
        shiftActive: false,
        ctrlActive: false,
        altActive: false,
        inputActive: false,
        isScrolling: false,
        selected: '',
        lastWhisper: '',
        isResizing: null,
        isDisplayed: true,
        previousMessages: [],
        previousMessagesPos: 0,
        blocked: [],
        /**
         * Shared/receiver state written: chat.isDisplayed.
         *
         * Observed DOM operations: chat.elem.container.show, chat.elem.button.collapsed.hide, chat.elem.container.hide, chat.elem.button.collapsed.show, hide, text.
         *
         * Input bindings: visible. Names describe inferred roles; protocol field names are preserved separately.
         */
        display: function (visible) {
          if (visible) {
            chat.isDisplayed = true;
            chat.elem.container.show();
            chat.elem.button.collapsed.hide();
          } else if (!visible) {
            chat.isDisplayed = false;
            chat.elem.container.hide();
            chat.elem.button.collapsed.show();
            $('a[data-id="chat"]').find('.notification-bubble').text(0).hide();
          }
        },
        /**
         * Shared/receiver state written: chat.selected.
         *
         * Observed DOM operations: removeClass, hide, chat.elem.messages[computed].show, chat.elem.button[computed].removeClass, chat.elem.button[computed].addClass.
         *
         * Input bindings: channel. Names describe inferred roles; protocol field names are preserved separately.
         */
        switchChannel: function (channel) {
          chat.elem.container.find('.tabs a').removeClass('selected');
          chat.elem.container.find('.messages').hide();
          chat.elem.messages[channel].show();
          chat.elem.button[channel].removeClass('flash');
          chat.elem.button[channel].addClass('selected');
          chat.updateNotificationCount(channel, true);
          chat.selected = channel;
          chat.updateScroll(chat.selected, true);
        },
        resize: function (windowX, innerHeight) {
          if (windowX === undefined) {
            windowX = pointer.window.x - 10;
          }
          if (innerHeight === undefined) {
            innerHeight = window.innerHeight - pointer.window.y - 15;
          }
          chat.elem.container.css('width', windowX + 'px');
          chat.elem.container.css('height', innerHeight + 'px');
          chat.checkOnlineDisplay();
        },
        checkOnlineDisplay: function () {
          var chatWidth = parseInt(chat.elem.container.css('width'));
          chatWidth < 400
            ? parseInt(chat.elem.container.find('.tabs').css('width')) > chatWidth - 100
              ? chat.elem.online.hide()
              : chat.elem.online.show()
            : chat.elem.online.show();
        },
        /**
         * Shared/receiver state written: chat.isScrolling.
         *
         * Observed DOM operations: chat.elem.button.backToBottom.hide.
         *
         * Input bindings: channel, forceScroll. Names describe inferred roles; protocol field names are preserved separately.
         */
        updateScroll: function (channel, forceScroll) {
          if (!chat.isScrolling || forceScroll) {
            var messageContainer = chat.elem.messages[channel][0];
            messageContainer.scrollTop = messageContainer.scrollHeight;
            if (forceScroll) {
              chat.isScrolling = false;
              chat.elem.button.backToBottom.hide();
            }
          }
        },
        /**
         * Chat rendering boundary. Message type selects different markup and metadata paths, including system notices, user messages and richer event content. Text insertion and HTML insertion are intentionally distinct operations in the original client; this commented reference does not convert one into the other. Channel visibility, scroll position, unread counts and per-user presentation all affect the resulting row.
         *
         * Shared/receiver state written: chat.lastWhisper.
         *
         * Observed DOM operations: remove, chat.elem.messages[computed].append, html, text, append, element.addClass, hide, show.
         *
         * Input bindings: message, selected. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* Render the original message variants and their metadata. Preserve the existing distinction between text insertion and trusted markup paths. */
        addMessageRow: function (message, selected) {
          selected === undefined && (selected = chat.selected);
          if (message.type === 'custom') {
            var messageHtml = message.message,
              text = '';
            message.golden && (text = ' golden');
            var element = $(
              '<div class="row"><span class="text custom ' + text + '">' + messageHtml + '</span></div>'
            );
          } else if (message.type === 'custom-tiny')
            var messageHtml = message.message,
              element = $('<div class="row"><span class="text custom tiny">' + messageHtml + '</span></div>');
          else if (message.type === 'announce' || message.type === 'system' || message.type === 'warning') {
            if (message.type === 'announce') {
              message.message = message.message;
            }
            var element = $('<div class="row"><span class="text ' + message.type + '"></span></div>');
          } else if (serverData.user.blocked.indexOf(message.username) === -1) {
            var snowballed = parseInt(message.snowballed),
              divClassRowText = '';
            for (var key in message.icons) {
              if (message.icons[key] && message.icons[key] !== '') {
                var badgeLabel = message.icons[key].toUpperCase();
                message.icons[key] === 'partner' && (badgeLabel = 'TWITCH PARTNER');
                message.icons[key] === 'gifter' && (badgeLabel = 'TOP 3 GIFTER');
                if (message.icons[key] === 'booster') {
                  badgeLabel = 'TOP DISCORD BOOSTER';
                }
                if (snowballed > 0) {
                  divClassRowText +=
                    '<img src="/img/badges/snowball.png" alt="OH OH OH!" title="OH OH OH!" class="snowball-icn">';
                  snowballed--;
                } else {
                  divClassRowText +=
                    '<img src="/img/badges/' +
                    message.icons[key] +
                    '.png" alt="' +
                    message.icons[key].toUpperCase() +
                    '" title="' +
                    badgeLabel +
                    '" class="snowball-alt">';
                }
              }
            }
            if (message.username !== undefined && message.channel === 'painting') {
              if (serverData.painting.owner.name.toLowerCase() === message.username.toLowerCase()) {
                if (snowballed > 0) {
                  divClassRowText +=
                    '<img src="/img/badges/snowball.png" alt="OH OH OH!" title="OH OH OH!" class="snowball-icn">';
                  snowballed--;
                } else
                  divClassRowText +=
                    '<img src="/img/badges/painting-owner.png" alt="Painting Moderator" title="Painting Owner" class="snowball-alt">';
              } else if (serverData.painting.moderators.length > 0)
                for (var key in serverData.painting.moderators) {
                  if (
                    serverData.painting.moderators[key].name.toLowerCase() === message.username.toLowerCase()
                  ) {
                    snowballed > 0
                      ? ((divClassRowText +=
                          '<img src="/img/badges/snowball.png" alt="OH OH OH!" title="OH OH OH!" class="snowball-icn">'),
                        snowballed--)
                      : (divClassRowText +=
                          '<img src="/img/badges/painting-moderator.png" alt="Painting Moderator" title="Painting Moderator"  class="snowball-alt">');
                    break;
                  }
                }
            }
            var html = '';
            message.guild !== '' &&
              (html =
                '<a href="#" class="guild open-guild" data-tag="' +
                message.guild +
                '">' +
                message.guild +
                '</a><span class="guild">&bull;</span>');
            var usernameStyle = 'style="color:' + appState.painting.palette.colors[message.color] + '"',
              divClassRowHtml = '';
            if (message.mention != '' && selected !== 'whispers') {
              if (message.mention.toLowerCase() === serverData.user.name.toLowerCase()) {
                divClassRowHtml += '<span class="mention">@' + message.mention + '</span>';
                !message.silent && selected !== chat.selected && chat.updateFlash(selected);
                if (!message.silent && serverData.user.settings.chat.notifications) {
                  showNotification('warning', message.username + ' mentioned you in chat:', message.message);
                }
              } else divClassRowHtml += '<span class="mention grey">@' + message.mention + '</span>';
            }
            var date = new Date(message.createdAt),
              minutes = date.getMinutes();
            if (minutes < 10) {
              minutes = '0' + minutes;
            }
            var hours = date.getHours();
            if (hours < 10) {
              hours = '0' + hours;
            }
            var timestampHtml = '<div class="time">' + hours + ':' + minutes + '</div>',
              username = message.username,
              toText = '';
            selected === 'whispers' &&
              ((html = ''),
              (divClassRowText = ''),
              (usernameStyle = 'style="color:#fa93f4"'),
              message.username.toLowerCase() === serverData.user.name.toLowerCase() &&
                ((username = message.target), (toText = 'to ')));
            var aHrefClassUserOpenProfileText = '',
              displayUsername = username;
            message.rainbow && (aHrefClassUserOpenProfileText = ' rainbowText');
            message.xmas &&
              ((aHrefClassUserOpenProfileText = ' xmasText'),
              (displayUsername = holidayTextHtml(displayUsername)));
            message.halloween && (aHrefClassUserOpenProfileText = ' halloween');
            var text = '';
            message.golden && (text = ' golden');
            !divClassRowText &&
              parseInt(message.snowballed) > 0 &&
              (divClassRowText +=
                '<img src="/img/badges/snowball.png" alt="OH OH OH!" title="OH OH OH!" class="snowball-icn">');
            var element = $(
              '<div class="row">' +
                timestampHtml +
                toText +
                divClassRowText +
                html +
                '<a href="#" class="user open-profile' +
                aHrefClassUserOpenProfileText +
                '" data-id="' +
                username.toLowerCase() +
                '"  data-profile="' +
                username.toLowerCase() +
                '" ' +
                usernameStyle +
                ' title="View profile">' +
                displayUsername +
                '</a>: ' +
                divClassRowHtml +
                '<span class="text' +
                text +
                '"></span></div>'
            );
            if (selected === 'whispers') {
              if (message.username.toLowerCase() === serverData.user.name.toLowerCase())
                chat.lastWhisper = message.target;
              else {
                chat.lastWhisper = message.username;
                if (selected !== chat.selected) {
                  if (
                    serverData.user.settings.chat.notifications &&
                    message.target.toLowerCase() !== serverData.user.name.toLowerCase()
                  ) {
                    showNotification('whisper', message.username + ' sent you a whisper:', message.message);
                  }
                  chat.updateFlash(selected);
                }
              }
            }
          }
          if (serverData.user.blocked.indexOf(message.username) !== -1) return;
          else {
            if (selected !== chat.selected) {
              if (message.username.toLowerCase() !== serverData.user.name.toLowerCase()) {
                !message.silent && (chat.updateNotificationCount(selected), chat.checkOnlineDisplay());
              }
            }
            if (
              chat.elem.messages[selected].find('.row').length >= serverData.user.settings.chat.messagesLimit
            ) {
              chat.elem.messages[selected].find('.row').eq(0).remove();
            }
            chat.elem.messages[selected].append(element);
            if (message.posX !== undefined && message.posY !== undefined && message.posS !== undefined) {
              element
                .find('.text')
                .html(
                  '<a href="#" class="go-to-coords" data-x="' +
                    parseInt(message.posX) +
                    '" data-y="' +
                    parseInt(message.posY) +
                    '"  data-s="' +
                    parseFloat(message.posS).toFixed(2) +
                    '" title="Click to view">[' +
                    parseInt(message.posX) +
                    ',' +
                    parseInt(message.posY) +
                    ']</a> <span class="here-text"></span>'
                );
              element.find('.text .here-text').text(message.message);
            } else if (message.type !== 'custom' && message.type !== 'custom-tiny') {
              if (element.find('.snowball-alt').length <= 0 && element.find('.snowball-icn').length > 0) {
                var parts = message.message.split(' ');
                if (parts.length > 1) {
                  element.find('.text').html('');
                  for (var partKey in parts) {
                    var holidayEmoji = randomHolidayEmoji();
                    element
                      .find('.text')
                      .append('<div class="txt"></div><div class="xmoji">' + holidayEmoji + '</div>');
                  }
                  for (var partKey in parts) {
                    element.find('.text .txt').eq(partKey).text(parts[partKey]);
                  }
                } else {
                  var holidayEmoji = randomHolidayEmoji();
                  element
                    .find('.text')
                    .append('<div class="txt"></div><div class="xmoji">' + holidayEmoji + '</div>');
                  element.find('.text .txt').text(message.message);
                }
              } else {
                element.find('.text').text(message.message);
              }
            }
            if (message.type === 'custom-tiny') {
              element.addClass('custom-tiny');
            }
            if (!serverData.user.settings.chat.timestamps) {
              element.find('.time').hide();
            }
            !serverData.user.settings.chat.guildTags && element.find('.guild').hide();
            chat.updateScroll(selected);
            if (!chat.isDisplayed && !message.silent) {
              var int = parseInt($('a[data-id="chat"]').find('.notification-bubble').text());
              int >= 99 || int == '99+' ? (int = '99+') : int++;
              $('a[data-id="chat"]').find('.notification-bubble').text(int).show();
            }
          }
        },
        deleteMessagesByUsername(username, paintingOnly) {
          if (paintingOnly) {
            chat.elem.container
              .find('.messages[data-id="painting"] .user[data-id="' + username.toLowerCase() + '"]')
              .closest('.row')
              .find('.text')
              .text('<message deleted>')
              .addClass('msg-deleted');
          } else
            chat.elem.container
              .find('.messages .user[data-id="' + username.toLowerCase() + '"]')
              .closest('.row')
              .find('.text')
              .text('<message deleted>')
              .addClass('msg-deleted');
        },
        updateFlash(channel, clearFlash) {
          clearFlash
            ? chat.elem.button[channel].removeClass('flash')
            : (chat.elem.button[channel].removeClass('flash'), chat.elem.button[channel].addClass('flash'));
        },
        updateNotificationCount(channel, resetCount) {
          if (channel === 'whispers') return;
          else if (resetCount) {
            chat.elem.button[channel].find('.unread-count').text(0);
            chat.elem.button[channel].find('.unread-count').hide();
          } else {
            var text = parseInt(chat.elem.button[channel].find('.unread-count').text());
            text >= 99 || text == '99+' ? (text = '99+') : text++;
            chat.elem.button[channel].find('.unread-count').text(text);
            text > 0 || text == '99+'
              ? chat.elem.button[channel].find('.unread-count').show()
              : chat.elem.button[channel].find('.unread-count').hide();
          }
        },
        /**
         * Outgoing chat and local-command boundary. Local slash commands may update the UI, request data, or emit a command packet instead of sending ordinary chat text. The existing channel, whisper, moderation and account checks therefore remain ahead of their dispatch branches. Preserve command spelling and payload keys, which are contracts with the original server.
         *
         * Outgoing socket event names: painting.command, snowball, chat.command, chat.message.
         *
         * Shared/receiver state written: trackedUsername, trackingExpiresAt.
         *
         * Observed DOM operations: removeClass, addClass.
         *
         * Scheduled work: setTimeout (1000 ms).
         *
         * Input bindings: message. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* Interpret local slash commands first; messages and moderation commands use their existing Socket.IO events and field names. */
        sendMessage: function (message) {
          var outgoingMessage = {};
          outgoingMessage.text = '';
          outgoingMessage.mention = '';
          outgoingMessage.type = chat.selected;
          outgoingMessage.target = '';
          outgoingMessage.color = canvasRenderer.color;
          var messagePayload = outgoingMessage;
          if (message === '!discord' || message === '/discord') {
            setTimeout(function () {
              var messageData = {};
              messageData.type = 'system';
              messageData.message = 'https://discord.gg/xcFJ6nY';
              chat.addMessageRow(messageData);
            }, 1000);
            window.open('https://discord.gg/xcFJ6nY', '_blank');
          } else if (message[0] === '/') {
            var parts = message.split(' ');
            if (parts[0] === '/admin') {
              if (parts[1] !== undefined) {
                if (parts[1] === serverData.user.name) {
                  var messageData = {};
                  messageData.type = 'system';
                  messageData.message = 'Bruh... You cannot give admin privileges to yourself!';
                  chat.addMessageRow(messageData);
                  return;
                } else {
                  var adminGrantedMessage = {};
                  adminGrantedMessage.type = 'system';
                  adminGrantedMessage.message = 'Pixelplace admin privileges successfully given to the user';
                  chat.addMessageRow(adminGrantedMessage);
                  return;
                }
              } else {
                var adminUsageMessage = {};
                adminUsageMessage.type = 'system';
                adminUsageMessage.message =
                  'Please type the username of the user you want to give admin privileges. /admin USERNAME';
                chat.addMessageRow(adminUsageMessage);
                return;
              }
            } else if (parts[0] === '/ban' && parts[1] !== undefined) {
              var adminCommand = {};
              adminCommand.cmd = '/ban';
              adminCommand.target = parts[1];
              adminCommand.boardId = serverData.painting.id;
              connection.io.emit('painting.command', adminCommand);
              return;
            } else if (parts[0] === '/unban' && parts[1] !== undefined) {
              var unbanCommand = {};
              unbanCommand.cmd = '/unban';
              unbanCommand.target = parts[1];
              unbanCommand.boardId = serverData.painting.id;
              connection.io.emit('painting.command', unbanCommand);
              return;
            } else if (parts[0] === '/u' && parts[1] !== undefined) {
              clickCallback(parts[1]);
              return;
            } else if (
              parts[0] === '/tm' &&
              (serverData.painting.id === 8 ||
                serverData.painting.id === 33944 ||
                serverData.painting.id === 7 ||
                serverData.painting.id === 17721)
            ) {
              loadTrackingHistory();
              return;
            } else if (parts[0] === '/c' && parts[1] !== undefined) {
              window.location.replace('/' + parseInt(parts[1]));
              return;
            } else if (parts[0] === '/snowball') {
              if (parts[1] !== undefined && parts[1]) {
                var snowballCommand = {};
                snowballCommand.cmd = '/snowball';
                snowballCommand.target = parts[1];
                connection.io.emit('snowball', snowballCommand);
              } else {
                var snowballUsageMessage = {};
                snowballUsageMessage.type = 'system';
                snowballUsageMessage.message =
                  'Type: /snowball USERNAME to throw a snowball at a player. Each snowball will replace one player icon for 60 minutes. If all icons are replaced, the user next messages may be ...funny 🎄. To get snowballs, activate XMAS username from the shop inventory. NOTE: Snowball expire after 60 minutes, use it quick!';
                chat.addMessageRow(snowballUsageMessage);
              }
              return;
            } else if (
              (parts[0] === '/guild' || parts[0] === '/tag' || parts[0] === '/g') &&
              parts[1] !== undefined
            ) {
              if (parts[1].length == 4) openGuild(parts[1]);
              else {
                ui.openModal('main', 'guilds');
              }
              return;
            } else if (parts[0] === '/untrack') {
              trackedUsername = null;
              trackingExpiresAt = 0;
              var trackingFilterRemovedMessage = {};
              trackingFilterRemovedMessage.type = 'system';
              trackingFilterRemovedMessage.message = 'Tracking filter removed';
              chat.addMessageRow(trackingFilterRemovedMessage);
              return;
            } else if (parts[0] === '/track') {
              if (parts[1] !== undefined) {
                trackedUsername = parts[1].toLowerCase();
                trackingExpiresAt = nowSeconds() + 180;
                var trackingConfirmation = {};
                trackingConfirmation.type = 'system';
                trackingConfirmation.message =
                  'Now filtering live tracking to only show this user pixels for the next 3 minutes';
                chat.addMessageRow(trackingConfirmation);
              } else {
                trackedUsername = null;
                var systemMessageData = {};
                systemMessageData.type = 'system';
                systemMessageData.message = 'Tracking filter removed';
                chat.addMessageRow(systemMessageData);
              }
              return;
            } else if (parts[0] === '/darkmode') {
              var darkmodeEnabled = localStorage.getItem('darkmode-enabled');
              if (darkmodeEnabled && parseInt(darkmodeEnabled) === 1) {
                $('body').removeClass('darkmode');
                localStorage.setItem('darkmode-enabled', 0);
              } else {
                localStorage.setItem('darkmode-enabled', 1);
                $('body').removeClass('darkmode').addClass('darkmode');
              }
              return;
            } else if (parts[0] === '/v1') {
              var darkmodeEnabled = localStorage.getItem('v1-enabled');
              darkmodeEnabled && parseInt(darkmodeEnabled) === 1
                ? (localStorage.setItem('v1-enabled', 0), window.location.reload())
                : (localStorage.setItem('v1-enabled', 1), window.location.reload());
              return;
            } else if (parts[0] === '/guild' || parts[0] === '/g' || parts[0] === '/tag') {
              ui.openModal('main', 'guilds');
              return;
            } else if (parts[0] === '/w' && parts[1] !== undefined) {
              messagePayload.mention = '';
              messagePayload.type = 'whispers';
              messagePayload.target = parts[1];
              parts.shift();
              parts.shift();
              message = parts.join(' ');
              if (serverData.user.settings.chat.invisible) {
                ui.openModal('main', 'tools');
                var invisibleWhisperWarning = {};
                invisibleWhisperWarning.type = 'warning';
                invisibleWhisperWarning.message =
                  'You cannot send whispers invisible mode. You can change this setting on Main Menu > Painting > Settings/Tools';
                chat.addMessageRow(invisibleWhisperWarning);
                return;
              }
            } else if (parts[0] === '/report' && parts[1] !== undefined) {
              messagePayload.mention = '';
              messagePayload.type = 'report';
              messagePayload.target = parts[1];
              parts.shift();
              parts.shift();
              message = parts.join(' ');
            } else if (parts[0] === '/help') {
              var commandHelpHeading = {};
              commandHelpHeading.type = 'system';
              commandHelpHeading.message = 'Available commands:';
              chat.addMessageRow(commandHelpHeading);
              var whisperHelpMessage = {};
              whisperHelpMessage.type = 'system';
              whisperHelpMessage.message = '/w USERNAME MESSAGE - Send a whisper to the user';
              chat.addMessageRow(whisperHelpMessage);
              var replyHelpMessage = {};
              replyHelpMessage.type = 'system';
              replyHelpMessage.message = '/r - Answer to the last whisperer';
              chat.addMessageRow(replyHelpMessage);
              var reportHelpMessage = {};
              reportHelpMessage.type = 'system';
              reportHelpMessage.message =
                '/report USERNAME MESSAGE - Report a user to PixelPlace moderation team';
              chat.addMessageRow(reportHelpMessage);
              var profileHelpMessage = {};
              profileHelpMessage.type = 'system';
              profileHelpMessage.message = '/u USERNAME - Open user profile';
              chat.addMessageRow(profileHelpMessage);
              var paintingHelpMessage = {};
              paintingHelpMessage.type = 'system';
              paintingHelpMessage.message = '/c PAINTING_ID - Navigate to another painting';
              chat.addMessageRow(paintingHelpMessage);
              var guildListHelpMessage = {};
              guildListHelpMessage.type = 'system';
              guildListHelpMessage.message = '/guild - Open the guild list';
              chat.addMessageRow(guildListHelpMessage);
              var guildProfileHelpMessage = {};
              guildProfileHelpMessage.type = 'system';
              guildProfileHelpMessage.message = '/guild TAG - Open the guild profile';
              chat.addMessageRow(guildProfileHelpMessage);
              var positionHelpMessage = {};
              positionHelpMessage.type = 'system';
              positionHelpMessage.message = '/here - Share your position in the chat';
              chat.addMessageRow(positionHelpMessage);
              var trackingHelpMessage = {};
              trackingHelpMessage.type = 'system';
              trackingHelpMessage.message =
                '/track USERNAME - Filter live tracking users (Premium command). Use /untrack to cancel)';
              chat.addMessageRow(trackingHelpMessage);
              var snowballHelpMessage = {};
              snowballHelpMessage.type = 'system';
              snowballHelpMessage.message = '/snowball - Special event';
              chat.addMessageRow(snowballHelpMessage);
              var darkModeHelpMessage = {};
              darkModeHelpMessage.type = 'system';
              darkModeHelpMessage.message = '/darkmode - Switch to the darkside of Pixelplace';
              chat.addMessageRow(darkModeHelpMessage);
              var profileCommandsHint = {};
              profileCommandsHint.type = 'system';
              profileCommandsHint.message = 'More commands available on profiles (click on any username)';
              chat.addMessageRow(profileCommandsHint);
              return;
            } else if (message === '/here' || message.split('/here').length >= 2) {
            } else if (serverData.user.isStaff && message !== '/here') {
              var cmdData = {};
              cmdData.cmd = message;
              cmdData.type = messagePayload.type;
              connection.io.emit('chat.command', cmdData);
              return;
            } else if (serverData.user.isChatMod && message !== '/here') {
              var hereCmdData = {};
              hereCmdData.cmd = message;
              hereCmdData.type = messagePayload.type;
              connection.io.emit('chat.command', hereCmdData);
              return;
            }
          }
          var parts = message.split('@');
          if (parts.length > 1) {
            var partEntrySplit = parts[parts.length - 1].split(' ');
            messagePayload.mention = partEntrySplit[0].replace(' ', '');
            message = message.replace('@' + partEntrySplit[0] + ' ', '');
            message = message.replace('@' + partEntrySplit[0] + '', '');
          }
          messagePayload.text = message;
          if (chat.selected != messagePayload.type && messagePayload.type !== 'report') {
            chat.switchChannel(messagePayload.type);
          }
          if (message === '/here' || message.split('/here').length >= 2) {
            messagePayload.posY = Math.round(canvasRenderer.height / 2 - canvasRenderer.y);
            messagePayload.posX = Math.round(canvasRenderer.width / 2 - canvasRenderer.x);
            messagePayload.posS = canvasRenderer.scale;
          }
          if (message != '') connection.io.emit('chat.message', messagePayload);
          else {
            var emptyMessageWarning = {};
            emptyMessageWarning.type = 'warning';
            emptyMessageWarning.message = 'Please enter a message.';
            chat.addMessageRow(emptyMessageWarning);
          }
        }
      };
      $(document).on(
        'pointermove',
        /**
         * Registered pointermove callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: pointer.window.x, pointer.window.y.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.target.id !== 'painting' &&
            event.target.id !== 'painting-zoom' &&
            event.target.tagName !== 'CANVAS' &&
            event.target.tagName !== 'canvas' &&
            event.target.getAttribute('area-block') === null &&
            pointer.triggerCursor(false);
          event = normalizePointerEvent(event);
          pointer.window.x = event.pageX;
          pointer.window.y = event.pageY;
          chat.isResizing && chat.resize();
        }
      );
      canvasRenderer.element.canvas.painting
        .add(canvasRenderer.element.canvas.protected)
        .add($('#areas'))
        .on('pointermove', function (event) {
          if (!pointer.touchDevice) {
            pointer.setCursorPosition(event);
          }
        });
      chat.elem.button.resize.on(
        'pointerdown',
        /**
         * Registered pointerdown callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.isResizing.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (chat.isResizing === null) {
            event.preventDefault();
            chat.isResizing = true;
          }
        }
      );
      $(document).on(
        'pointerup',
        /**
         * Registered pointerup callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.isResizing.
         *
         * Observed DOM operations: chat.elem.container.css.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          chat.isResizing &&
            (event.preventDefault(),
            localStorage.setItem('chat-size-w', chat.elem.container.css('width')),
            localStorage.setItem('chat-size-h', chat.elem.container.css('height')),
            (chat.isResizing = null));
        }
      );
      /**
       * Observed DOM operations: chat.elem.button.painting.hide, chat.elem.button.nonenglish.show, text, chat.elem.button.nonenglish.hide, hide.
       *
       * Scheduled work: setTimeout (1000 ms).
       */
      function initializeChatChannel() {
        if (serverData.painting.id === 7) {
          chat.elem.button.painting.hide();
          chat.elem.button.nonenglish.show();
          chat.switchChannel('global');
          var preferredLanguage = window.navigator.languages ? window.navigator.languages[0] : null;
          preferredLanguage =
            preferredLanguage ||
            window.navigator.language ||
            window.navigator.browserLanguage ||
            window.navigator.userLanguage;
          var languageCode = preferredLanguage;
          languageCode.indexOf('-') !== -1 && (languageCode = languageCode.split('-')[0]);
          if (languageCode.indexOf('_') !== -1) {
            languageCode = languageCode.split('_')[0];
          }
          if (languageCode && (languageCode.toLowerCase() !== 'en' || languageCode.toLowerCase() !== 'us')) {
            var image = new Image();
            image.onload = function (unusedEvent) {
              chat.elem.button.nonenglish
                .find('.title')
                .html(
                  '<img src="/img/flags/' +
                    languageCode.toUpperCase() +
                    '.svg" class="flag-chat"> ' +
                    languageCode.toUpperCase()
                );
            };
            image.onerror = function () {
              chat.elem.button.nonenglish.find('.title').html('Non-English');
            };
            image.src = '/img/flags/' + languageCode.toUpperCase() + '.svg';
          } else chat.elem.button.nonenglish.find('.title').text('Non-English');
        } else {
          chat.elem.button.nonenglish.hide();
          chat.switchChannel('painting');
          $('.artist-island').hide();
          $('.gold-rush-island').hide();
        }
        setTimeout(function () {
          var messageData = {};
          messageData.type = 'system';
          messageData.target = '';
          messageData.color = 0;
          messageData.mention = '';
          messageData.username = '';
          messageData.message = 'Type /w USERNAME MESSAGE to send a whisper to a specific player.';
          messageData.icons = [];
          messageData.createdAt = '';
          chat.addMessageRow(messageData, 'whispers');
          var replyWhisperHint = {};
          replyWhisperHint.type = 'system';
          replyWhisperHint.target = '';
          replyWhisperHint.color = 0;
          replyWhisperHint.mention = '';
          replyWhisperHint.username = '';
          replyWhisperHint.message = 'Type /r to answer the last whisperer.';
          replyWhisperHint.icons = [];
          replyWhisperHint.createdAt = '';
          chat.addMessageRow(replyWhisperHint, 'whispers');
          var globalChatWelcome = {};
          globalChatWelcome.type = 'system';
          globalChatWelcome.target = '';
          globalChatWelcome.color = 0;
          globalChatWelcome.mention = '';
          globalChatWelcome.username = '';
          globalChatWelcome.message =
            'Welcome to the global chat (shared across all paintings). English only! (use Non-English tab for other languages)';
          globalChatWelcome.icons = [];
          globalChatWelcome.createdAt = '';
          chat.addMessageRow(globalChatWelcome, 'global');
          var commandHelpHint = {};
          commandHelpHint.type = 'system';
          commandHelpHint.target = '';
          commandHelpHint.color = 0;
          commandHelpHint.mention = '';
          commandHelpHint.username = '';
          commandHelpHint.message = 'Type /help for a listing of a few commands';
          commandHelpHint.icons = [];
          commandHelpHint.createdAt = '';
          chat.addMessageRow(commandHelpHint, 'global');
          if (serverData.painting.id === 7) {
          } else {
            var paintingWelcomeMessage = {};
            paintingWelcomeMessage.type = 'system';
            paintingWelcomeMessage.target = '';
            paintingWelcomeMessage.color = 0;
            paintingWelcomeMessage.mention = '';
            paintingWelcomeMessage.username = '';
            paintingWelcomeMessage.message =
              'Welcome to « ' +
              serverData.painting.name +
              ' » created by ' +
              serverData.painting.owner.name +
              '';
            paintingWelcomeMessage.icons = [];
            paintingWelcomeMessage.createdAt = '';
            chat.addMessageRow(paintingWelcomeMessage, 'painting');
            if (serverData.painting.description) {
              var paintingDescriptionMessage = {};
              paintingDescriptionMessage.type = 'system';
              paintingDescriptionMessage.target = '';
              paintingDescriptionMessage.color = 0;
              paintingDescriptionMessage.mention = '';
              paintingDescriptionMessage.username = '';
              paintingDescriptionMessage.message = serverData.painting.description;
              paintingDescriptionMessage.icons = [];
              paintingDescriptionMessage.createdAt = '';
              chat.addMessageRow(paintingDescriptionMessage, 'painting');
            }
            if (!serverData.painting.shopItems) {
              var shopDisabledMessage = {};
              shopDisabledMessage.type = 'system';
              shopDisabledMessage.target = '';
              shopDisabledMessage.color = 0;
              shopDisabledMessage.mention = '';
              shopDisabledMessage.username = '';
              shopDisabledMessage.message = '(Shop items are currently disabled on this painting)';
              shopDisabledMessage.icons = [];
              shopDisabledMessage.createdAt = '';
              chat.addMessageRow(shopDisabledMessage, 'painting');
            }
          }
        }, 1000);
      }
      chat.elem.button.collapsed.on('click', function (event) {
        event.preventDefault();
        chat.display(true);
      });
      chat.elem.button.hide.on('click', function (event) {
        event.preventDefault();
        chat.display(false);
      });
      chat.elem.container.find('.tabs a').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var id = $(this).attr('data-id');
          id !== 'forums' &&
            (event.preventDefault(),
            id === 'guild' && serverData.user.guild == ''
              ? ui.openModal('main', 'guilds')
              : chat.switchChannel(id));
        }
      );
      chat.elem.container.find('.messages').on(
        'scroll',
        /**
         * Registered scroll callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.isScrolling.
         *
         * Observed DOM operations: css, chat.elem.button.backToBottom.hide, chat.elem.button.backToBottom.show.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (
            parseInt($(this)[0].scrollTop) + parseInt($(this).css('height')) >=
            parseInt($(this)[0].scrollHeight) - 10
          ) {
            if (chat.isScrolling) {
              chat.isScrolling = false;
              chat.elem.button.backToBottom.hide();
            }
          } else if (!chat.isScrolling) {
            chat.isScrolling = true;
            chat.elem.button.backToBottom.show();
          }
        }
      );
      chat.elem.button.backToBottom.on('click', function (event) {
        event.preventDefault();
        chat.updateScroll(chat.selected, true);
      });
      chat.elem.container.find('form').on(
        'submit',
        /**
         * Registered submit callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.inputActive, chat.previousMessagesPos.
         *
         * Observed DOM operations: chat.elem.input.val, chat.elem.input.removeClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          chat.inputActive = false;
          var inputValue = chat.elem.input.val();
          inputValue != '' &&
            (chat.sendMessage(inputValue),
            chat.previousMessages.unshift(inputValue),
            chat.previousMessages.length > 3 && chat.previousMessages.pop(),
            (chat.previousMessagesPos = 0));
          chat.elem.input.val('');
          chat.elem.input.blur();
          chat.elem.input.removeClass('whisper');
          chat.elem.input.removeClass('mention');
        }
      );
      chat.elem.input.on(
        'focusout',
        /**
         * Registered focusout callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.inputActive.
         *
         * Observed DOM operations: chat.elem.input.val, chat.elem.input.removeClass.
         *
         * Input bindings: focusoutPayload. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (focusoutPayload) {
          focusoutPayload.preventDefault();
          !chat.shiftActive &&
            ((chat.inputActive = false),
            chat.elem.input.val(''),
            chat.elem.input.removeClass('whisper'),
            chat.elem.input.removeClass('mention'));
        }
      );
      var interfaceVisible = true;
      $(document).on(
        'keydown',
        /**
         * Registered keydown callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: enabled, setIntervalResult, chat.inputActive, chat.previousMessagesPos, interfaceVisible, chat.shiftActive, chat.ctrlActive, chat.altActive.
         *
         * Observed DOM operations: chat.elem.input.val, chat.elem.input.removeClass, addClass, hide, removeClass, show.
         *
         * Scheduled work: setInterval.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (
            (event.which === 37 || event.which === 38 || event.which === 39 || event.which === 40) &&
            !chat.inputActive &&
            !ui.activeElement
          ) {
            var width = Math.round(canvasRenderer.width / 2 - canvasRenderer.x),
              height = Math.round(canvasRenderer.height / 2 - canvasRenderer.y);
            if (event.which === 37) width -= 10;
            else if (event.which === 38) {
              height -= 10;
            } else if (event.which === 39) width += 10;
            else event.which === 40 && (height += 10);
            canvasRenderer.centerPositionTo(canvasRenderer.scale, width, height);
          } else if (event.which === 32 && !chat.inputActive && !ui.activeElement) {
            event.preventDefault();
            selectedItemId === null &&
              setIntervalResult === null &&
              (!enabled && (localStorage.setItem('know-about-space-bar', true), (enabled = true)),
              canvasRenderer.drawPixelAt(),
              (setIntervalResult = setInterval(function () {
                canvasRenderer.drawPixelAt();
              }, serverData.painting.rate)));
          } else if (event.which === 13) {
            if (ui.activeElement) {
            } else if (!chat.inputActive) {
              event.preventDefault();
              chat.inputActive = true;
              chat.elem.input.focus();
              if (chat.selected === 'whispers') {
                if (chat.lastWhisper !== '') {
                  chat.elem.input.val('/w ' + chat.lastWhisper + ' ');
                } else chat.elem.input.val('/w ');
                chat.elem.input.trigger('input');
              }
            }
          } else if (!chat.ctrlActive && event.which === 67 && !chat.inputActive && !ui.activeElement) {
            if (chat.isDisplayed) chat.display(false);
            else {
              chat.display(true);
            }
          } else if (event.which === 27) {
            if (ui.activeElement) ui.closeModal();
            else if (chat.inputActive) {
              chat.inputActive = false;
              chat.elem.input.val('');
              chat.elem.input.blur();
              chat.elem.input.removeClass('whisper');
              chat.elem.input.removeClass('mention');
            } else ui.openModal('main', 'tools');
          } else if (chat.shiftActive && event.which === 84 && !chat.inputActive && !ui.activeElement) {
            var displayTracking = serverData.user.settings.painting.liveTracking ? true : false;
            ui.onChangeTools('tools-display-tracking', displayTracking);
          } else if (
            (serverData.painting.id === 8 ||
              serverData.painting.id === 33944 ||
              serverData.painting.id === 17721 ||
              serverData.painting.id === 7) &&
            chat.shiftActive &&
            event.which === 69 &&
            !chat.inputActive &&
            !ui.activeElement
          ) {
            loadTrackingHistory();
          } else if (chat.shiftActive && event.which === 66 && !chat.inputActive && !ui.activeElement) {
            var displayTracking = serverData.user.settings.painting.bot ? true : false;
            ui.onChangeTools('tools-display-bot', displayTracking);
          } else if (chat.shiftActive && event.which === 72 && !chat.inputActive && !ui.activeElement) {
            var displayTracking = serverData.user.settings.painting.gridDisplay ? true : false;
            ui.onChangeTools('tools-display-grid', displayTracking);
          } else if (chat.shiftActive && event.which === 77 && !chat.inputActive && !ui.activeElement) {
            var displayTracking = serverData.user.settings.painting.lockPainting ? true : false;
            ui.onChangeTools('tools-lock-painting', displayTracking);
          } else if (chat.shiftActive && event.which === 76 && !chat.inputActive && !ui.activeElement) {
            var displayTracking = serverData.user.settings.painting.saveTracking ? true : false;
            ui.onChangeTools('tools-display-save-tracking', displayTracking);
          } else if (event.which === 38 && chat.inputActive) {
            if (chat.previousMessages.length > 0) {
              if (chat.previousMessages.length - 1 < chat.previousMessagesPos) {
                chat.previousMessagesPos = 0;
              }
              chat.elem.input.val(chat.previousMessages[chat.previousMessagesPos]);
              chat.previousMessagesPos++;
            }
          } else if (chat.shiftActive && event.which === 71 && !chat.inputActive && !ui.activeElement)
            openSocialPanel('guild');
          else if (chat.shiftActive && event.which === 70 && !chat.inputActive && !ui.activeElement)
            openSocialPanel('friends');
          else if (
            chat.shiftActive &&
            (event.which === 106 || event.which === 220) &&
            !chat.inputActive &&
            !ui.activeElement
          ) {
            if (interfaceVisible) {
              interfaceVisible = false;
              $('#coordinates').addClass('display-none');
              $('#copyright').hide();
              $('#menu-buttons').hide();
              $('#menu-buttons-bottom').hide();
              $('#menu-buttons-right-top').hide();
              $('#menu-buttons-right-bottom').hide();
              $('#palette-buttons').hide();
              $('#more-colors-below').hide();
              chat.display(false);
              showNotification('success', 'UI hidden', 'Hit * key to display the UI again');
            } else {
              interfaceVisible = true;
              $('#coordinates').removeClass('display-none');
              $('#copyright').show();
              $('#menu-buttons').show();
              $('#menu-buttons-bottom').show();
              $('#menu-buttons-right-top').show();
              $('#menu-buttons-right-bottom').show();
              $('#palette-buttons').show();
              $('#more-colors-below').show();
              chat.display(true);
            }
          } else if (event.which === 107 && !chat.inputActive && !ui.activeElement) {
            zoomAroundViewportCenter(true);
          } else if (event.which === 109 && !chat.inputActive && !ui.activeElement) {
            zoomAroundViewportCenter(false);
          } else if (event.which === 16) chat.shiftActive = true;
          else if (event.which === 17) chat.ctrlActive = true;
          else event.which === 18 && (chat.altActive = true);
        }
      );
      window.onfocus = function () {
        chat.altActive = false;
        setIntervalResult !== null && (clearInterval(setIntervalResult), (setIntervalResult = null));
      };
      $(document).on(
        'keyup',
        /**
         * Registered keyup callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.shiftActive, chat.ctrlActive, chat.altActive, setIntervalResult.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (event.which === 16) chat.shiftActive = false;
          else if (event.which === 17) {
            chat.ctrlActive = false;
          } else if (event.which === 18) {
            chat.altActive = false;
          } else if (event.which === 32) {
            setIntervalResult !== null && (clearInterval(setIntervalResult), (setIntervalResult = null));
          }
        }
      );
      $(document).on(
        'click',
        '.open-profile',
        /**
         * Registered click callback delegated to ".open-profile". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          clickCallback($(this).attr('data-profile'));
        }
      );
      /**
       * Direct network calls: GET /api/get-user.php.
       *
       * Shared/receiver state written: chat.inputActive.
       *
       * Observed DOM operations: removeClass, chat.elem.input.val, hide, show, css.
       *
       * Input bindings: requestData. Names describe inferred roles; protocol field names are preserved separately.
       */
      function clickCallback(requestData) {
        var profileElement = $('#profile');
        profileElement.find('.box-x').removeClass('rainbow-border');
        profileElement.find('.box-x').removeClass('golden-border');
        if (chat.shiftActive) {
          if (!chat.inputActive) {
            chat.inputActive = true;
            chat.elem.input.focus();
            chat.elem.input.trigger('input');
          }
          if (chat.elem.input.val().length > 0) {
            if (chat.elem.input.val() === '/disable')
              chat.elem.input.val(chat.elem.input.val() + ' ' + requestData + ' ');
            else if (chat.elem.input.val() === '/disable ')
              chat.elem.input.val(chat.elem.input.val() + '' + requestData + ' ');
            else if (chat.elem.input.val() === '/mute')
              chat.elem.input.val(chat.elem.input.val() + ' ' + requestData + ' ');
            else if (chat.elem.input.val() === '/mute ') {
              chat.elem.input.val(chat.elem.input.val() + '' + requestData + ' ');
            } else chat.elem.input.val(chat.elem.input.val() + '@' + requestData + ' ');
          } else {
            chat.elem.input.val('@' + requestData + ' ');
          }
        } else {
          $('#guild').hide();
          $('#profile .box-x').show();
          $('#profile .box-content-x > div').hide();
          $('#profile .box-content-x > .loading').show();
          $('#profile').show();
          var usernameData = {};
          usernameData.username = requestData;
          var usernameDataRequestData = usernameData;
          if (!usernameDataRequestData.username) {
            return;
          } else if (usernameDataRequestData.username.toLowerCase() === serverData.user.name.toLowerCase()) {
            $('#profile a[data-id="bio-edit"]').show();
            $('#profile .edit-user-avatar').css('display', 'block');
          } else {
            $('#profile a[data-id="bio-edit"]').hide();
            $('#profile .edit-user-avatar').css('display', 'none');
          }
          api.xhr.req(
            'GET',
            '/api/get-user.php',
            usernameDataRequestData,
            true,
            /**
             * HTTP completion callback for /api/get-user.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Outgoing socket event names: user.profile.
             *
             * Observed DOM operations: html, show, hide, text, attr, val, addClass, removeClass (plus 2 other observed operations).
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                if (response.canvas && parseInt(response.canvas) > 0) {
                  $('#profile .user-avatar').html(
                    '<img src="/canvas/' + response.canvas + '.png?t=' + nowSeconds() + '">'
                  );
                  $('#profile .user-avatar').show();
                } else {
                  $('#profile .user-avatar').html('<img src="/img/blank.png">');
                  $('#profile .user-avatar').show();
                }
                connection.io.emit('user.profile', response.username);
                $('.followers-list').text('').hide();
                profileElement.find('.chip').hide();
                profileElement.find('.painting').hide();
                profileElement.find('.profile-online').hide();
                profileElement.find('.profile-offline').hide();
                profileElement.find('.profile-away').hide();
                response.admin && profileElement.find('.i-admin').show();
                response.mod && profileElement.find('.i-moderator').show();
                response.chatmod && profileElement.find('.i-chat-moderator').show();
                response.vip && profileElement.find('.i-vip').show();
                response.premiumIcon && profileElement.find('.i-premium-' + response.premiumIcon).show();
                if (response.previousUsername && response.previousUsername !== '') {
                  profileElement.find('.previousUsername').show();
                  profileElement.find('.previousUsername span').text(response.previousUsername);
                } else {
                  profileElement.find('.previousUsername').hide();
                }
                if (response.othersIcons) {
                  var parts = response.othersIcons.split(',');
                  for (var key in parts) {
                    profileElement.find('.i-' + parts[key]).show();
                  }
                }
                if (response.guild) {
                  profileElement.find('.profile-name a span').html('' + response.guild + '');
                  profileElement.find('.profile-name a').attr('data-tag', response.guild);
                  response.guild === serverData.user.guild
                    ? (profileElement
                        .find('.profile-guild-rank select option')
                        .eq(0)
                        .text(response.guild_rank_1_title),
                      profileElement
                        .find('.profile-guild-rank select option')
                        .eq(1)
                        .text(response.guild_rank_2_title),
                      profileElement
                        .find('.profile-guild-rank select option')
                        .eq(2)
                        .text(response.guild_rank_3_title),
                      profileElement.find('.profile-guild-rank select').val(response.guild_rank).change(),
                      profileElement
                        .find('.profile-guild-rank select')
                        .attr('data-username', response.username),
                      profileElement
                        .find('.profile-guild-rank select')
                        .attr('data-rank', response.guild_rank),
                      profileElement.find('.profile-guild-rank').show())
                    : profileElement.find('.profile-guild-rank').hide();
                } else {
                  profileElement.find('.profile-guild-rank').hide();
                  profileElement.find('.profile-name a span').text('');
                }
                if (response.bio) {
                  profileElement.find('.bio span').text(response.bio);
                  profileElement.find('.bio span').show();
                } else {
                  profileElement.find('.bio span').text('');
                  profileElement.find('.bio span').hide();
                }
                $('#profile .user-inventory [data-name="copper_ores"] > div').text(response.copper_ores);
                $('#profile .user-inventory [data-name="iron_ores"] > div').text(response.iron_ores);
                $('#profile .user-inventory [data-name="pyrite_ores"] > div').text(response.pyrite_ores);
                $('#profile .user-inventory [data-name="emerald_stones"] > div').text(
                  response.emerald_stones
                );
                $('#profile .user-inventory [data-name="sapphire_stones"] > div').text(
                  response.sapphire_stones
                );
                $('#profile .user-inventory [data-name="ruby_stones"] > div').text(response.ruby_stones);
                $('#profile .user-inventory [data-name="gold_ores"] > div').text(response.gold_ores);
                $('#profile .user-inventory [data-name="gold_bars"] > div').text(response.gold_bars);
                $('#profile .user-inventory [data-name="pixelite_ores"] > div').text(response.pixelite_ores);
                $('#profile .user-inventory [data-name="gold_mine_level"] > div').text(
                  response.gold_mine_level
                );
                $('#profile .user-inventory [data-name="gold_dynamite_level"] > div').text(
                  response.gold_dynamite_level
                );
                $('#profile .user-inventory [data-name="gold_mine_level"] img').attr(
                  '/img/gold-tools-' + response.gold_mine_level + '.png'
                );
                $('#profile .user-inventory [data-name="gold_dynamite_level"] img').attr(
                  '/img/gold-bomb-' + response.gold_dynamite_level + '.png'
                );
                for (var key in response.social) {
                  if (key == 1) {
                    var text = response.social[key].split('#');
                    if (text[1] !== undefined && text[1] === '0') {
                      text = text[0];
                    } else text = response.social[key];
                    profileElement.find('.i-discord').show();
                    profileElement.find('.i-discord > div').text(text);
                  } else if (key == 2) {
                    profileElement.find('.i-reddit').show();
                    profileElement.find('.i-reddit > div').text(response.social[key]);
                  } else
                    key == 3 &&
                      (profileElement.find('.i-twitch').show(),
                      profileElement.find('.i-twitch > div').text(response.social[key]));
                }
                response.guild
                  ? profileElement.find('.profile-name > span').html(' &bull; ' + response.username)
                  : profileElement.find('.profile-name > span').text(response.username);
                profileElement.find('.profile-name-ban').hide();
                parseInt(response.status) === 2
                  ? (profileElement
                      .find('.profile-name')
                      .attr('title', 'BANNED')
                      .removeClass('banned')
                      .addClass('banned'),
                    response.banReason &&
                      profileElement
                        .find('.profile-name-ban')
                        .text('Ban reason: ' + response.banReason)
                        .show())
                  : profileElement.find('.profile-name').attr('title', '').removeClass('banned');
                var maxResult = Math.max(
                  parseInt(response.rainbowTime),
                  parseInt(response.xmasTime),
                  parseInt(response.halloweenTime)
                );
                response.golden
                  ? (profileElement.find('.bio span').removeClass('golden').addClass('golden'),
                    profileElement.find('.box-x').removeClass('golden-border').addClass('golden-border'))
                  : (profileElement.find('.bio span').removeClass('golden'),
                    profileElement.find('.box-x').removeClass('golden-border'));
                if (
                  maxResult === parseInt(response.rainbowTime) &&
                  parseInt(response.rainbowTime) > nowSeconds()
                ) {
                  profileElement
                    .find('.profile-name > span')
                    .removeClass('rainbowText')
                    .removeClass('xmasText')
                    .removeClass('halloween-fire');
                  profileElement.find('.profile-name > span').addClass('rainbowText');
                  profileElement.find('.box-x').removeClass('golden-border');
                  profileElement.find('.box-x').removeClass('rainbow-border').addClass('rainbow-border');
                } else if (
                  maxResult === parseInt(response.xmasTime) &&
                  parseInt(response.xmasTime) > nowSeconds()
                ) {
                  profileElement
                    .find('.profile-name > span')
                    .removeClass('rainbowText')
                    .removeClass('xmasText')
                    .removeClass('halloween-fire');
                  profileElement.find('.profile-name > span').addClass('xmasText');
                  profileElement.find('.profile-name > span').html(holidayTextHtml(response.username));
                } else
                  maxResult === parseInt(response.halloweenTime) &&
                  parseInt(response.halloweenTime) > nowSeconds()
                    ? (profileElement
                        .find('.profile-name > span')
                        .removeClass('rainbowText')
                        .removeClass('xmasText')
                        .removeClass('halloween-fire'),
                      profileElement.find('.profile-name > span').addClass('halloween-fire'))
                    : profileElement
                        .find('.profile-name > span')
                        .removeClass('rainbowText')
                        .removeClass('xmasText')
                        .removeClass('halloween-fire');
                profileElement
                  .find('.createdAt')
                  .text('Joined ' + formatElapsedTime(new Date(response.createdAt), true) + ' ago');
                if (response.lastLogin)
                  profileElement
                    .find('.lastOnline')
                    .text('Last login  ' + formatElapsedTime(new Date(response.lastLogin), true) + ' ago')
                    .show();
                else {
                  profileElement.find('.lastOnline').hide();
                }
                profileElement
                  .find('.pixels')
                  .text(parseInt(response.pixels).toLocaleString('ru-RU') + ' pixels placed');
                profileElement
                  .find('.battlePoints')
                  .text(parseInt(response.battlePoints).toLocaleString('ru-RU') + ' battle points');
                if (response.followers !== undefined) {
                  profileElement.find('.followers').text(parseInt(response.followers) + ' followers');
                  profileElement.find('.followers').attr('data-username', response.username.toLowerCase());
                }
                profileElement.find('.painting span').hide();
                serverData.user.friends.indexOf(response.username) !== -1
                  ? (profileElement.find('.btn-add-friend-data').hide(),
                    profileElement.find('.btn-remove-friend').show(),
                    profileElement
                      .find('.btn-remove-friend')
                      .attr('data-username', response.username.toLowerCase()))
                  : (profileElement
                      .find('.btn-add-friend-data')
                      .show()
                      .attr('data-username', response.username.toLowerCase()),
                    profileElement.find('.btn-remove-friend').hide());
                if (serverData.user.blocked.indexOf(response.username) !== -1) {
                  profileElement.find('.btn-add-block-data').hide();
                  profileElement.find('.btn-unblock-user').show();
                  profileElement
                    .find('.btn-unblock-user')
                    .attr('data-username', response.username.toLowerCase());
                } else {
                  profileElement
                    .find('.btn-add-block-data')
                    .show()
                    .attr('data-username', response.username.toLowerCase());
                  profileElement.find('.btn-unblock-user').hide();
                }
                profileElement.find('.btn-report-user').show().attr('data-username', response.username);
                profileElement.find('.btn-report-user').parent().find('.manage-buttons').remove();
                var enabled = false;
                if (parseInt(serverData.painting.id) === 8 && serverData.painting.moderators.length > 0)
                  for (var key in serverData.painting.moderators) {
                    if (
                      serverData.painting.moderators[key].name.toLowerCase() ===
                      serverData.user.name.toLowerCase()
                    ) {
                      enabled = true;
                      break;
                    }
                  }
                if (serverData.user.isStaff || enabled) {
                  profileElement
                    .find('.btn-report-user')
                    .parent()
                    .append(
                      '<button class="manage-buttons" data-id="account" data-username="' +
                        response.username +
                        '">ACCOUNTS</button>'
                    );
                }
                serverData.user.isStaff &&
                  (profileElement
                    .find('.btn-report-user')
                    .parent()
                    .append(
                      '<button class="manage-buttons"  data-id="mute" data-username="' +
                        response.username +
                        '">MUTE</button>'
                    ),
                  profileElement
                    .find('.btn-report-user')
                    .parent()
                    .append(
                      '<button class="manage-buttons"  data-id="alert" data-username="' +
                        response.username +
                        '">ALERT</button>'
                    ),
                  profileElement
                    .find('.btn-report-user')
                    .parent()
                    .append(
                      '<button class="manage-buttons"  data-id="disable" data-username="' +
                        response.username +
                        '">DISABLE</button>'
                    ),
                  profileElement
                    .find('.btn-report-user')
                    .parent()
                    .append(
                      '<button class="manage-buttons"  data-id="coins" data-username="' +
                        response.username +
                        '">COINS</button>'
                    ));
                var gETEnabled = false;
                if (serverData.user.settings.painting.isOwner) gETEnabled = true;
                else if (serverData.painting.moderators.length > 0) {
                  for (var key in serverData.painting.moderators) {
                    if (
                      serverData.painting.moderators[key].name.toLowerCase() ===
                      serverData.user.name.toLowerCase()
                    ) {
                      gETEnabled = true;
                      break;
                    }
                  }
                }
                gETEnabled &&
                  profileElement
                    .find('.btn-report-user')
                    .parent()
                    .append(
                      '<button class="manage-buttons"  data-id="ban" data-username="' +
                        response.username +
                        '">BAN</button>'
                    );
                profileElement.find('.inv-framed').html('');
                if (response.framed !== undefined && response.framed.length)
                  for (var key in response.framed) {
                    var count = 0;
                    if (parseInt(response.framed[key].frame_id) === 1) {
                      count = 'copper-frame-bg.png';
                    } else if (parseInt(response.framed[key].frame_id) === 2) count = 'iron-frame-bg.png';
                    else if (parseInt(response.framed[key].frame_id) === 3) count = 'pyrite-frame-bg.png';
                    else
                      parseInt(response.framed[key].frame_id) === 4 && (count = 'pixelite-frame-bg.png?v=1');
                    var gETCount = 0;
                    if (parseInt(response.framed[key].gems_id) === 1) gETCount = 'emerald-frame-bg.png';
                    else if (parseInt(response.framed[key].gems_id) === 2) gETCount = 'sapphire-frame-bg.png';
                    else parseInt(response.framed[key].gems_id) === 3 && (gETCount = 'ruby-frame-bg.png');
                    var element = $(
                      '<div class="painting-bloc"> <img src="/canvas/' +
                        response.framed[key].painting_id +
                        '.png?t=' +
                        (parseInt(response.framed[key].created_at) + 600) +
                        '" class="pixelate " style="background-color:' +
                        appState.painting.palette.colors[response.framed[key].bg] +
                        '">' +
                        ' <div class="frame"><div class="bg-sp sp-framed-' +
                        response.framed[key].sp +
                        '"></div><div class="bg-rainbow"></div><img src="/img/' +
                        count +
                        '" class="pixelate">' +
                        '     <div><img src="/img/' +
                        gETCount +
                        '"></div>' +
                        ' </div>' +
                        ' <a href="#" class="author open-profile" data-profile="" title="Author">' +
                        '     <div class="arrow"></div>' +
                        '     <div class="icns"></div>' +
                        '     <div class="author-name"></div>' +
                        ' </a>' +
                        '</div>'
                    );
                    profileElement.find('.inv-framed').append(element);
                    if (parseInt(response.framed[key].frame_id) == 4) {
                      element.find('.bg-rainbow').show();
                    } else element.find('.bg-rainbow').hide();
                    element.find('.author-name').text(response.framed[key].author_username);
                    element.find('.open-profile').attr('data-profile', response.framed[key].author_username);
                    if (response.framed[key].author_icons) {
                      var parts = response.framed[key].author_icons.split(',');
                      for (var partKey in parts) {
                        element
                          .find('.icns')
                          .append(
                            '<img src="/img/badges/' + parts[partKey] + '.png" class="badge" width="16">'
                          );
                      }
                    }
                  }
                $('#profile .box-content-x > div').show();
                $('#profile .box-content-x > .loading').hide();
                $('#profile').show();
              } else {
                showNotification('error', 'Error', response.message);
                $('#profile').hide();
              }
            }
          );
        }
      }
      /**
       * Direct network calls: GET /api/gembox.php.
       *
       * Observed DOM operations: show, hide, gemboxElement.show.
       */
      function openGemBox() {
        var gemboxElement = $('#gembox');
        gemboxElement.find('.box-x').show();
        gemboxElement.find('.box-content-x > div').hide();
        gemboxElement.find('.box-content-x > .loading').show();
        gemboxElement.find('.collect').hide();
        gemboxElement.show();
        var requestData = {};
        requestData.inventory = true;
        api.xhr.req(
          'GET',
          '/api/gembox.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/gembox.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: serverData.user.ppcoins.
           *
           * Observed DOM operations: text, show, hide.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              if (response.ppcoins !== undefined) {
                serverData.user.ppcoins = parseInt(response.ppcoins);
                $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                  serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                );
                $('.my-pp b').text(serverData.user.ppcoins);
              }
              gemboxElement.find('.box-content-x > div').show();
              gemboxElement.find('.box-content-x > .loading').hide();
              renderGemBoxLoot(response);
            } else {
              showNotification('error', 'Error', response.message);
            }
          }
        );
      }
      function renderGemBoxLoot(lootResult) {
        var gemboxElement = $('#gembox');
        $('.tc b').text(lootResult.item_13);
        lootResult.gold_bars !== undefined && $('.gb b').text(lootResult.gold_bars);
        gemboxElement.find('.open-gembox').find('.collect-btn').hide();
        gemboxElement.find('.open-gembox').removeClass('collect');
        gemboxElement.find('.open-gembox').removeClass('disabled');
        gemboxElement.find('.open-gembox').removeClass('opened');
        gemboxElement.find('.open-gembox').find('.open-gembox-btn > img').attr('src', '/img/gembox.png');
        gemboxElement.find('.open-gembox').find('.open-gembox-btn > img').fadeIn(1000);
        gemboxElement.find('.open-gembox').show();
        gemboxElement.find('.open-gembox').find('.open-gembox-btn > img').css('opacity', 1);
        gemboxElement.find('.loots').find('.loot-item').remove();
        parseInt(lootResult.item_13) <= 0 &&
          (gemboxElement.find('.open-gembox').removeClass('collect'),
          gemboxElement.find('.open-gembox').addClass('disabled'));
      }
      $('.odds-gem').on('click', function (event) {
        event.preventDefault();
        alert(
          '-- Guaranteed loots --\n\nCopper Ore: 10+\nIron Ore: 7+\nEmerald: 6+\nSapphire: 3+\n\n-- Rare loots --\n\nPyrite Ore: 60% loot chance\nRuby: 30% loot chance\nGold Ore: 10% loot chance\n\n-- Epic loots --\n\n5 % chance to get up to 3 of the following epic loot:\n\nAtomic bomb, 3 Days Premium, Halloween Username, XMAS Username, Pixel Missile\n\n-- Legendary loots --\n\nVIP badge: 0.01% loot chance'
        );
      });
      $(document).on(
        'click',
        '.open-gembox-btn',
        /**
         * Registered click callback delegated to ".open-gembox-btn". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-shop.php.
         *
         * Observed DOM operations: openGemboxElement.removeClass, openGemboxElement.addClass, hide, css, attr.
         *
         * Scheduled work: setTimeout (500 ms).
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var openGemboxElement = $(this).closest('.open-gembox');
          if (openGemboxElement.hasClass('disabled')) {
            alert('You need to buy a treasure chest first. Click the Get more button at the bottom');
          } else if (openGemboxElement.hasClass('opened')) {
          } else if (openGemboxElement.hasClass('collect')) {
            openGemboxElement.removeClass('collect');
            openGemboxElement.addClass('disabled');
            openGemboxElement.find('.open-gembox-btn > img').fadeIn(1000);
            openGemboxElement.find('.collect-btn').hide();
            var left =
                parseInt(openGemboxElement.find('.loots').css('width')) / 2 -
                parseInt(openGemboxElement.find('.loots').find('.loot-item').eq(0).css('width')) / 2,
              top =
                parseInt(openGemboxElement.find('.loots').css('height')) / 2 -
                parseInt(openGemboxElement.find('.loots').find('.loot-item').eq(0).css('height')) / 2,
              styles = {};
            styles.left = left;
            styles.top = top;
            openGemboxElement.find('.loots').find('.loot-item').animate(styles, 500);
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Observed DOM operations: remove, hide, openGemboxElement.removeClass, attr, openGemboxElement.show, css, openGemboxElement.attr, openGemboxElement.addClass.
               */
              function () {
                openGemboxElement.find('.loots').find('.loot-item').remove();
                openGemboxElement.find('.collect-btn').hide();
                openGemboxElement.removeClass('disabled');
                openGemboxElement.removeClass('opened');
                openGemboxElement.find('.open-gembox-btn > img').attr('src', '/img/gembox.png');
                openGemboxElement.find('.open-gembox-btn > img').fadeIn(1000);
                openGemboxElement.show();
                openGemboxElement.find('.open-gembox-btn > img').css('opacity', 1);
                if (parseInt(openGemboxElement.attr('data-more')) <= 0) {
                  openGemboxElement.removeClass('collect');
                  openGemboxElement.addClass('disabled');
                }
                var updatedLoot = {};
                updatedLoot.item_13 = parseInt(openGemboxElement.attr('data-more'));
                renderGemBoxLoot(updatedLoot);
              },
              500
            );
          } else {
            openGemboxElement.addClass('opened');
            openGemboxElement.find('.open-gembox-btn > img').attr('src', '/img/gembox-open.png?v=1');
            var lootRequest = {};
            lootRequest.use = true;
            lootRequest.item = 13;
            lootRequest.color = 0;
            var requestData = lootRequest;
            api.xhr.req(
              'POST',
              '/api/post-shop.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-shop.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: text.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  var count = 0;
                  collectGemBoxLoot(count, response, openGemboxElement);
                  $('.tc b').text(response.item_13);
                  $('.gb b').text(response.gold_bars);
                  $('.copper-ore-count').text(response.copper_ores);
                  $('.iron-ore-count').text(response.iron_ores);
                  $('.pyrite-ore-count').text(response.pyrite_ores);
                  $('.emerald-count').text(response.emerald_stones);
                  $('.sapphire-count').text(response.sapphire_stones);
                  $('.ruby-count').text(response.ruby_stones);
                  $('.gold-ore-count').text(response.gold_ores);
                  $('.pixelite-ore-count').text(response.pixelite_ores);
                } else showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      /**
       * Observed DOM operations: append, css, element.css, lootElement.addClass, lootElement.attr, lootElement.removeClass.
       *
       * Scheduled work: setTimeout (300 ms).
       *
       * Input bindings: lootIndex, lootResult, lootElement. Names describe inferred roles; protocol field names are preserved separately.
       */
      function collectGemBoxLoot(lootIndex, lootResult, lootElement) {
        if (lootResult.loot[lootIndex] !== undefined) {
          var text = '';
          if (lootResult.loot[lootIndex].quality === 1) text = ' loot-blue';
          else if (lootResult.loot[lootIndex].quality === 2) {
            text = ' loot-violet';
          } else if (lootResult.loot[lootIndex].quality === 3) {
            text = ' loot-yellow';
          }
          var element = $(
            '<div class="loot-item" title="' +
              lootResult.loot[lootIndex].name +
              '"><div class="bg-quality ' +
              text +
              '"></div><div class="im"><img src="/img/' +
              lootResult.loot[lootIndex].icon +
              '"></div><div class="amt">' +
              lootResult.loot[lootIndex].amount +
              '</div></div>'
          );
          lootElement.find('.loots').append(element);
          var lootCenterOffsetX =
              parseInt(lootElement.find('.loots').css('width')) / 2 - parseInt(element.css('width')) / 2,
            lootImageHeight =
              parseInt(lootElement.find('.loots').css('height')) / 2 - parseInt(element.css('height')) / 2;
          element.css('left', lootCenterOffsetX + 'px');
          element.css('top', lootImageHeight + 'px');
          var lootLength = lootResult.loot.length,
            lootPosition = {};
          lootPosition.top = '-72px';
          lootPosition.left = '-55px';
          var topRightLootPosition = {};
          topRightLootPosition.top = '-72px';
          topRightLootPosition.left = '105px';
          var bottomLeftLootPosition = {};
          bottomLeftLootPosition.top = '80px';
          bottomLeftLootPosition.left = '-55px';
          var bottomRightLootPosition = {};
          bottomRightLootPosition.top = '80px';
          bottomRightLootPosition.left = '105px';
          var leftLootPosition = {};
          leftLootPosition.top = '-50px';
          leftLootPosition.left = '-100px';
          var topLootPosition = {};
          topLootPosition.top = '-77px';
          topLootPosition.left = '22px';
          var rightLootPosition = {};
          rightLootPosition.top = '-50px';
          rightLootPosition.left = '150px';
          var revealedBottomLeftLootPosition = {};
          revealedBottomLeftLootPosition.top = '80px';
          revealedBottomLeftLootPosition.left = '-55px';
          var revealedBottomRightLootPosition = {};
          revealedBottomRightLootPosition.top = '80px';
          revealedBottomRightLootPosition.left = '115px';
          var revealedLeftLootPosition = {};
          revealedLeftLootPosition.top = '-50px';
          revealedLeftLootPosition.left = '-100px';
          var revealedTopLootPosition = {};
          revealedTopLootPosition.top = '-77px';
          revealedTopLootPosition.left = '22px';
          var revealedRightLootPosition = {};
          revealedRightLootPosition.top = '-50px';
          revealedRightLootPosition.left = '150px';
          var expandedLeftLootPosition = {};
          expandedLeftLootPosition.top = '50px';
          expandedLeftLootPosition.left = '-100px';
          var expandedBottomLootPosition = {};
          expandedBottomLootPosition.top = '90px';
          expandedBottomLootPosition.left = '22px';
          var expandedRightLootPosition = {};
          expandedRightLootPosition.top = '50px';
          expandedRightLootPosition.left = '150px';
          var options = {};
          options['4'] = [
            lootPosition,
            topRightLootPosition,
            bottomLeftLootPosition,
            bottomRightLootPosition
          ];
          options['5'] = [
            leftLootPosition,
            topLootPosition,
            rightLootPosition,
            revealedBottomLeftLootPosition,
            revealedBottomRightLootPosition
          ];
          options['6'] = [
            revealedLeftLootPosition,
            revealedTopLootPosition,
            revealedRightLootPosition,
            expandedLeftLootPosition,
            expandedBottomLootPosition,
            expandedRightLootPosition
          ];
          var itemQuantities = options,
            styles = {};
          styles.left = itemQuantities[lootLength][lootIndex].left;
          styles.top = itemQuantities[lootLength][lootIndex].top;
          element.animate(styles, 500);
          setTimeout(function () {
            lootIndex++;
            collectGemBoxLoot(lootIndex, lootResult, lootElement);
          }, 300);
        } else {
          var lootFadeStyles = {};
          lootFadeStyles.opacity = 0;
          lootElement.find('.open-gembox-btn > img').animate(lootFadeStyles, 500);
          lootElement.find('.collect-btn').fadeIn(500);
          lootElement.addClass('collect');
          lootElement.attr('data-more', lootResult.item_13);
          lootElement.removeClass('opened');
        }
      }
      $(document).on(
        'change',
        '.profile-guild-rank select[name="guild-rank"]',
        /**
         * Registered change callback delegated to ".profile-guild-rank select[name=\"guild-rank\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-guild-rank.php.
         *
         * Observed DOM operations: attr, val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (event.originalEvent) {
            var guildRankRequest = {};
            guildRankRequest.username = $(this).attr('data-username');
            guildRankRequest.rank = $(this).val();
            var requestData = guildRankRequest;
            api.xhr.req(
              'POST',
              '/api/post-guild-rank.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-guild-rank.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: val, attr.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  showNotification('success', 'Success', 'Guild rank updated');
                } else {
                  $('.profile-guild-rank select[name="guild-rank"]')
                    .val($('.profile-guild-rank select[name="guild-rank"]').attr('data-rank'))
                    .change();
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.open-onlineUsers',
        /**
         * Registered click callback delegated to ".open-onlineUsers". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Outgoing socket event names: painting.players.
         *
         * Observed DOM operations: hide, show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#guild').hide();
          $('#profile').hide();
          $('#onlineUsers .box-x').show();
          $('#onlineUsers .box-content-x > div').hide();
          $('#onlineUsers .box-content-x > .loading').show();
          $('#onlineUsers').show();
          connection.io.emit('painting.players', serverData.painting.id);
        }
      );
      $('#onlineUsers .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#onlineUsers').hide();
        }
      );
      $('#onlineUsers').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          $(event.target).attr('id') === 'onlineUsers' && (event.preventDefault(), $('#onlineUsers').hide());
        }
      );
      $(document).on(
        'click',
        '#profile .manage-buttons',
        /**
         * Registered click callback delegated to "#profile .manage-buttons". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-coins.php.
         *
         * Shared/receiver state written: chat.inputActive.
         *
         * Observed DOM operations: attr, chat.elem.input.val, hide.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if ($(this).attr('data-id') === 'account') {
            var moderatorWindow = window.open(
              '/api/get-user-sessions.php?username=' + $(this).attr('data-username'),
              'Moderator tool: User data',
              'width=885,height=600,toolbar=0,menubar=0,location=0'
            );
            moderatorWindow.focus();
          } else if ($(this).attr('data-id') === 'mute') {
            chat.inputActive = true;
            chat.elem.input.focus();
            chat.elem.input.val('/mute ' + $(this).attr('data-username') + ' ');
            $('#profile').hide();
          } else if ($(this).attr('data-id') === 'ban') {
            chat.inputActive = true;
            chat.elem.input.focus();
            chat.elem.input.val('/ban ' + $(this).attr('data-username') + ' ');
            $('#profile').hide();
          } else if ($(this).attr('data-id') === 'alert') {
            chat.inputActive = true;
            chat.elem.input.focus();
            chat.elem.input.val('/alert ' + $(this).attr('data-username') + ' ');
            $('#profile').hide();
          } else if ($(this).attr('data-id') === 'disable') {
            chat.inputActive = true;
            chat.elem.input.focus();
            chat.elem.input.val('/disable ' + $(this).attr('data-username') + ' ');
            $('#profile').hide();
          } else if ($(this).attr('data-id') === 'coins') {
            var coins = prompt('Enter amount-p');
            if (coins !== null) {
              ui.triggerLoader(true);
              var requestData = {};
              requestData.coins = coins;
              requestData.username = $(this).attr('data-username');
              api.xhr.req('POST', '/api/post-coins.php', requestData, true, function (success, response) {
                ui.triggerLoader(false);
                success
                  ? showNotification('success', 'Sent')
                  : showNotification('error', 'Error', response.message);
              });
            }
            $('#profile').hide();
          }
        }
      );
      $('#profile .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#profile').hide();
        }
      );
      $('.modx .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.modx').hide();
        }
      );
      $('#profile').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if ($(event.target).attr('id') === 'profile') {
            event.preventDefault();
            $('#profile').hide();
          }
        }
      );
      /**
       * Direct network calls: GET /api/get-guild.php.
       *
       * Observed DOM operations: hide, show.
       *
       * Input bindings: tag. Names describe inferred roles; protocol field names are preserved separately.
       */
      function openGuild(tag) {
        $('#profile').hide();
        $('#guild .box-x').show();
        $('#guild .box-content-x > div').hide();
        $('#guild .box-content-x > .loading').show();
        $('#guild').show();
        var guildQuery = {};
        guildQuery.tag = tag;
        var requestData = guildQuery;
        if (!requestData.tag) return;
        api.xhr.req(
          'GET',
          '/api/get-guild.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-guild.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: html, attr, show, hide, text, css.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              $('#guild .guild-name .tag').html(response.tag);
              $('#guild .edit-guild-emblem').attr('data-tag', response.tag);
              if (serverData.user.guild.toUpperCase() === response.tag.toUpperCase())
                $('#guild .edit-guild-emblem').show();
              else {
                $('#guild .edit-guild-emblem').hide();
              }
              response.canvas && parseInt(response.canvas) > 0
                ? ($('#guild .emblem').html(
                    '<img src="/canvas/' + response.canvas + '.png?t=' + nowSeconds() + '">'
                  ),
                  $('#guild .emblem').show())
                : ($('#guild .emblem').html(''), $('#guild .emblem').hide());
              $('#guild .guild-name .name').text(response.name);
              $('#guild .description').text(response.description);
              $('#guild .createdAt a').text(response.owner_username);
              $('#guild .createdAt a')
                .text(response.owner_username)
                .attr('data-profile', response.owner_username.toLowerCase());
              $('#guild .createdAt span').text(
                formatElapsedTime(new Date(response.created_at), true) + ' ago'
              );
              $('#guild .points').text(
                parseInt(response.points).toLocaleString('ru-RU') +
                  ' points (' +
                  parseInt(response.battlePoints).toLocaleString('ru-RU') +
                  ' battle points)'
              );
              $('#guild .position').text('#' + response.position);
              response.position < 1 ? $('#guild .position').hide() : $('#guild .position').show();
              $('#guild .members').text(
                response.members_count + ' member' + (response.members_count != 1 ? 's' : '')
              );
              $('#guild .guild-new-apply').attr('data-tag', response.tag);
              parseInt(response.auto_accept)
                ? $('#guild .guild-new-apply').text('JOIN').css('background-color', '#00b2e1')
                : $('#guild .guild-new-apply').text('APPLY TO JOIN').css('background-color', '#ff9d50');
              $('#guild .box-content-x > div').show();
              $('#guild .box-content-x > .loading').hide();
              $('#guild').show();
            } else {
              showNotification('error', 'Error', response.message);
              $('#guild').hide();
            }
          }
        );
      }
      $(document).on(
        'click',
        '.open-guild',
        /**
         * Registered click callback delegated to ".open-guild". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if ($(this).attr('data-from-area')) {
            var knowAboutAreasWars = localStorage.getItem('know-about-areas-wars');
            if (!knowAboutAreasWars) {
              localStorage.setItem('know-about-areas-wars', 1);
              alert(
                "Countries can be occupied by guilds during wars. A message will be posted in the chat when the next war begin. This message won't show again."
              );
            }
          }
          if ($(event.target).hasClass('guild-new-apply')) return;
          else openGuild($(this).attr('data-tag'));
        }
      );
      $('#guild .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#guild').hide();
        }
      );
      $('#guild').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          $(event.target).attr('id') === 'guild' && (event.preventDefault(), $('#guild').hide());
        }
      );
      chat.elem.input.on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.inputActive.
         *
         * Observed DOM operations: chat.elem.input.val.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (!chat.inputActive) {
            event.preventDefault();
            chat.inputActive = true;
            chat.elem.input.focus();
            if (chat.selected === 'whispers') {
              chat.lastWhisper !== ''
                ? chat.elem.input.val('/w ' + chat.lastWhisper + ' ')
                : chat.elem.input.val('/w ');
              chat.elem.input.trigger('input');
            }
          }
        }
      );
      chat.elem.input.on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, chat.elem.input.val, chat.elem.input.addClass, removeClass, addClass.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (chat.inputActive) {
            var inputValue = $(this).val();
            if (inputValue[0] === '/') {
              var parts = inputValue.split(' ');
              if (parts[0] === '/r' && parts[1] !== undefined) {
                inputValue = inputValue.replace('/r ', '/w ' + chat.lastWhisper + ' ');
                if (inputValue === '/w' || inputValue === '/w  ') {
                  inputValue = '/w ';
                }
                chat.elem.input.val(inputValue);
                chat.elem.input.addClass('whisper');
              } else if (parts[0] === '/w' && parts[1] !== undefined) {
                chat.elem.input.addClass('whisper');
              } else {
                $(this).removeClass('mention');
                $(this).removeClass('whisper');
              }
            } else {
              var parts = inputValue.split('@');
              if (parts.length > 1) {
                $(this).addClass('mention');
              } else {
                $(this).removeClass('mention');
                $(this).removeClass('whisper');
              }
            }
          }
        }
      );
      $('.btn-report-user').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: chat.inputActive.
         *
         * Observed DOM operations: attr, chat.elem.input.val, hide.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var username = $(this).attr('data-username');
          chat.inputActive = true;
          chat.elem.input.focus();
          chat.elem.input.val('/report ' + username + ' ');
          $('#profile').hide();
        }
      );
      var modalSelectors = {};
      modalSelectors.modal = '';
      modalSelectors.content = '';
      modalSelectors.extra = '';
      var previousModal = {};
      previousModal.modal = '';
      previousModal.content = '';
      previousModal.extra = '';
      /* Coordinate modal state, form content, toolbar preferences, and the settings persisted by the original client. */
      ui = {
        selectors: modalSelectors,
        previous: previousModal,
        activeAlert: false,
        activeElement: null,
        activeContent: null,
        activeCaptcha: false,
        previousActiveElement: null,
        previousActiveContent: null,
        moreContentBelow: $('.more-content-below'),
        elem: {
          container: $('#modals'),
          settings: {
            painting: $('#modals .box-content[data-id="painting"]'),
            tools: $('#modals .box-content[data-id="tools"]'),
            account: $('#modals .box-content[data-id="account"]')
          }
        },
        lastStartGuildFetch: 0,
        guildListSearch: '',
        guildListLimit: 100,
        guildListCache: null,
        guildListI: 1,
        triggerFormInputError: function (inputName, text) {
          if (ui.activeElement) {
            var selectedElement = ui.activeElement
                .find('.box-content')
                .find('.input-error[data-name="' + inputName + '"]'),
              boxContentElementFind = ui.activeElement
                .find('.box-content')
                .find('[name="' + inputName + '"]');
            if (text === '') {
              selectedElement.text('');
              selectedElement.css('visibility', 'hidden');
              boxContentElementFind.removeClass('error');
            } else {
              selectedElement.text(text);
              selectedElement.css('visibility', 'visible');
              boxContentElementFind.addClass('error');
            }
          }
        },
        addLoaderToBox: function () {
          ui.activeElement &&
            ui.activeContent &&
            (ui.activeElement.find('.loading').remove(),
            ui.activeContent.append(
              '<div class="loading"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
            ));
        },
        triggerLoader: function (visible) {
          if (ui.activeElement && ui.activeContent) {
            if (ui.selectors.modal === 'captcha') return;
            else if (visible) {
              ui.activeContent.find('> form').hide();
              ui.activeContent.find('> div').hide();
              ui.activeContent.find('.loading').css('display', 'flex');
            } else {
              ui.activeContent.find('> form').show();
              ui.activeContent.find('> div').show();
              ui.activeContent.find('.loading').css('display', 'none');
            }
          }
        },
        /**
         * Select and initialize the requested modal/content branch. Many branches read current server/account state or initiate additional requests, so the operation is more than a DOM show/hide toggle. Preserve the original selectors and branch-specific initialization order.
         *
         * Direct network calls: GET /api/get-user-guild.php, GET /api/get-painting-access.php?getStatus=true&painting= <dynamic suffix>.
         *
         * Shared/receiver state written: ui.previous.modal, ui.previous.content, ui.previous.extra, ui.selectors.modal, ui.selectors.content, ui.selectors.extra, ui.activeContent.
         *
         * Observed DOM operations: removeClass, addClass, hide, show, css, html, text, val (plus 2 other observed operations).
         *
         * Scheduled work: setTimeout (1000 ms).
         *
         * Input bindings: modal, content, extra, paintingEditData. Names describe inferred roles; protocol field names are preserved separately.
         */
        updateActiveContent: function (modal, content, extra, paintingEditData) {
          if (ui.activeElement) {
            ui.previous.modal = ui.selectors.modal;
            ui.previous.content = ui.selectors.content;
            ui.previous.extra = ui.selectors.extra;
            ui.selectors.modal = modal;
            ui.selectors.content = content;
            ui.selectors.extra = extra;
            ui.activeContent = ui.activeElement.find('.box-content[data-id="' + content + '"]');
            ui.addLoaderToBox();
            ui.activeElement.find('.box-menu li.selected').removeClass('selected');
            var contentId = content;
            (content === 'tools' || content === 'painting' || content === 'top' || content === 'top-users') &&
              (contentId = 'top');
            ui.activeElement
              .find('.box-menu li a[data-content="' + contentId + '"]')
              .closest('li')
              .addClass('selected');
            ui.activeElement.find('.box-content').hide();
            ui.activeElement.find('.box-sub-menu').hide();
            ui.activeElement.find('.box-sub-menu li.selected').removeClass('selected');
            content === 'painting'
              ? extra === 'edit'
                ? ui.activeElement
                    .find('.box-sub-menu li a[data-content="' + content + '"][data-extra="edit"]')
                    .closest('li')
                    .addClass('selected')
                : ui.activeElement
                    .find('.box-sub-menu li a[data-content="' + content + '"][data-extra="create"]')
                    .closest('li')
                    .addClass('selected')
              : ui.activeElement
                  .find('.box-sub-menu li a[data-content="' + content + '"]')
                  .closest('li')
                  .addClass('selected');
            ui.activeElement.find('.box-sub-menu[data-id="' + contentId + '"').show();
            serverData.user.settings.painting.isOwner
              ? ui.activeElement.find('.box-sub-menu [data-content="painting"][data-extra="edit"]').show()
              : ui.activeElement.find('.box-sub-menu [data-content="painting"][data-extra="edit"]').hide();
            if (modal === 'main' && content === 'shop') {
              canvasRenderer.loadUserItems();
              for (var key in appState.painting.palette.premium) {
                $('.prem-colors')
                  .find('span')
                  .eq(key)
                  .css('background-color', appState.painting.palette.premium[key]);
              }
              if (serverData.user.premium.active && serverData.user.premium.expire_at > nowSeconds()) {
                $('.premium-subscribe').hide();
                $('.premium-subscribe-alt').show();
                var text = '',
                  expireAt = serverData.user.premium.expire_at - nowSeconds();
                if (expireAt <= 86400) text = 'less than 1 day';
                else {
                  text = Math.ceil(expireAt / 86400) + ' days';
                }
                $('.premium-subscribed').html('' + text + ' left<span>Click to manage</span>');
                $('.premium-subscribed').show();
                $('.subscribed-off').show();
              } else {
                $('.premium-subscribe-alt').hide();
                $('.premium-subscribe').show();
                $('.premium-subscribed').hide();
                $('.subscribed-off').hide();
              }
            } else if (modal === 'main' && content === 'freecoins') canvasRenderer.loadFreeCoins();
            else if (modal === 'main' && content === 'terms') {
              $.ajax({
                url: '/legal.html?t=' + nowSeconds(),
                type: 'GET',
                /**
                 * Observed DOM operations: html, css.
                 *
                 * Scheduled work: setTimeout (300 ms).
                 *
                 * Input bindings: response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                success: function (response) {
                  ui.activeElement.find('.box-content[data-id="terms"] > div').html(response);
                  ui.activeElement.find('.box-content[data-id="terms"]').css('scroll-behavior', 'unset');
                  ui.activeElement.find('.box-content[data-id="terms"]').scrollTop(0);
                  ui.activeElement.find('.box-content[data-id="terms"]').css('scroll-behavior', 'smooth');
                  setTimeout(function () {
                    if (extra !== '') {
                      var element = $('#' + extra),
                        styles = {};
                      styles.scrollTop = element.offset().top - 100;
                      ui.activeElement.find('.box-content[data-id="terms"]').animate(styles, 'slow');
                    }
                  }, 300);
                }
              });
            } else if (modal === 'main' && content === 'blog') {
              var backgroundRequest = {};
              backgroundRequest.url = '/blog/index.php?iframe=1&t=' + nowSeconds();
              backgroundRequest.type = 'GET';
              backgroundRequest.success = function (argument) {
                var count = 0;
                if (
                  count &&
                  (!serverData.user.connected ||
                    (serverData.user.connected &&
                      (parseInt(serverData.user.premium.expire_at) < nowSeconds() ||
                        !serverData.user.premium.active)))
                ) {
                  ui.activeElement
                    .find('.box-content[data-id="blog"] > div')
                    .html(
                      '<div><script type="text/javascript" src="//services.vlitag.com/adv1/?q=27546936fdc4110d04b58b19cd9d49f5" defer="" async=""></script><script> var vitag = vitag || {};</script></div><div class="absm"><div class="title">Advertising</div><div class="adsbyvli" style="width:320px; height:50px" data-ad-slot="vi_23510102705"></div> <script>(vitag.Init = window.vitag.Init || []).push(function () { viAPItag.display("vi_23510102705") })</script></div><div class="blog">' +
                        argument +
                        '</div>'
                    );
                } else
                  ui.activeElement
                    .find('.box-content[data-id="blog"] > div')
                    .html('<div class="blog">' + argument + '</div>');
              };
              $.ajax(backgroundRequest);
            } else if (modal === 'main' && content === 'painting') {
              ui.loadPaintingCreateOrEdit(paintingEditData);
            } else if (modal === 'main' && content === 'guilds') {
              ui.triggerLoader(true);
              api.xhr.req(
                'GET',
                '/api/get-user-guild.php',
                {},
                true,
                /**
                 * HTTP completion callback for /api/get-user-guild.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Observed DOM operations: hide, show, val, prop, removeClass, addClass.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  success
                    ? (response.isOwner
                        ? (ui.activeElement
                            .find(
                              '.box-content[data-id="guilds"] .open-modal[data-content="guilds-store"][data-extra="create"]'
                            )
                            .hide(),
                          ui.activeElement
                            .find(
                              '.box-content[data-id="guilds"] .open-modal[data-content="guilds-store"][data-extra="edit"]'
                            )
                            .show(),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="name"]')
                            .val(response.name),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="description"]')
                            .val(response.description),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_1"]')
                            .val(response.rank_1_title),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_2"]')
                            .val(response.rank_2_title),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_3"]')
                            .val(response.rank_3_title),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_1_emblem"]')
                            .prop('checked', parseInt(response.rank_1_emblem) ? true : false),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_2_emblem"]')
                            .prop('checked', parseInt(response.rank_2_emblem) ? true : false),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_3_emblem"]')
                            .prop('checked', parseInt(response.rank_3_emblem) ? true : false),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_1_members"]')
                            .prop('checked', parseInt(response.rank_1_members) ? true : false),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_2_members"]')
                            .prop('checked', parseInt(response.rank_2_members) ? true : false),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="rank_3_members"]')
                            .prop('checked', parseInt(response.rank_3_members) ? true : false),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="id"]')
                            .val(response.tag),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="auto-accept"]')
                            .val(response.auto_accept),
                          parseInt(response.auto_accept) === 1
                            ? (ui.activeElement
                                .find(
                                  '.box-content[data-id="guilds-store"] .input-checkbox[data-name="auto-accept"]'
                                )
                                .removeClass('selected'),
                              ui.activeElement
                                .find(
                                  '.box-content[data-id="guilds-store"] .input-checkbox[data-name="auto-accept"]'
                                )
                                .addClass('selected'),
                              ui.activeElement
                                .find(
                                  '.box-content[data-id="guilds-store"] .input-checkbox[data-name="auto-accept"]'
                                )
                                .parent()
                                .find('input[name="auto-accept"]')
                                .val(1))
                            : (ui.activeElement
                                .find(
                                  '.box-content[data-id="guilds-store"] .input-checkbox[data-name="auto-accept"]'
                                )
                                .removeClass('selected'),
                              ui.activeElement
                                .find(
                                  '.box-content[data-id="guilds-store"] .input-checkbox[data-name="auto-accept"]'
                                )
                                .parent()
                                .find('input[name="auto-accept"]')
                                .val(0)))
                        : (ui.activeElement
                            .find(
                              '.box-content[data-id="guilds"] .open-modal[data-content="guilds-store"][data-extra="create"]'
                            )
                            .show(),
                          ui.activeElement
                            .find(
                              '.box-content[data-id="guilds"] .open-modal[data-content="guilds-store"][data-extra="edit"]'
                            )
                            .hide(),
                          ui.activeElement.find('.box-content[data-id="guilds-store"] [name="name"]').val(''),
                          ui.activeElement
                            .find('.box-content[data-id="guilds-store"] [name="description"]')
                            .val(''),
                          ui.activeElement.find('.box-content[data-id="guilds-store"] [name="id"]').val('')),
                      ui.triggerLoader(false),
                      ui.loadGuilds(0))
                    : (ui.activeElement
                        .find(
                          '.box-content[data-id="guilds"] .open-modal[data-content="guilds-store"][data-extra="edit"]'
                        )
                        .hide(),
                      ui.activeElement
                        .find(
                          '.box-content[data-id="guilds"] .open-modal[data-content="guilds-store"][data-extra="create"]'
                        )
                        .show(),
                      ui.triggerLoader(false),
                      ui.loadGuilds(0));
                }
              );
            } else if (modal === 'main' && content === 'guilds-store') {
              if (extra === 'create') {
                ui.activeElement.find('.box-content[data-id="guilds-store"] h1 span').text('New guild');
                ui.activeElement
                  .find('.box-content[data-id="guilds-store"] #submit-guild-store')
                  .text('CREATE GUILD')
                  .show();
                ui.activeElement.find('.box-content[data-id="guilds-store"] #submit-guild-delete').hide();
                ui.activeElement.find('.box-content[data-id="guilds-store"] [name="tag"]').show();
                ui.activeElement.find('.box-content[data-id="guilds-store"] .tag').show();
                ui.activeElement.find('.box-content[data-id="guilds-store"][name="id"]').val('');
              } else {
                ui.activeElement
                  .find('.box-content[data-id="guilds-store"][name="id"]')
                  .val(serverData.user.guild);
                ui.activeElement.find('.box-content[data-id="guilds-store"] h1 span').text('Edit guild');
                ui.activeElement
                  .find('.box-content[data-id="guilds-store"] #submit-guild-store')
                  .text('SAVES CHANGES')
                  .show();
                ui.activeElement.find('.box-content[data-id="guilds-store"] #submit-guild-delete').show();
                ui.activeElement.find('.box-content[data-id="guilds-store"] .tag').hide();
                ui.activeElement.find('.box-content[data-id="guilds-store"] [name="tag"]').hide();
              }
            } else if (modal === 'main' && content === 'account') {
              if (!serverData.user.hasEmail) {
                ui.activeElement.find('.account-password').hide();
              } else {
                ui.activeElement.find('.account-password').show();
              }
              if (serverData.user.social.discord.linked) {
                ui.activeElement
                  .find('.linked-account[data-id="1"]')
                  .find('span')
                  .text(serverData.user.social.discord.name);
                ui.activeElement.find('.linked-account[data-id="1"]').find('span').show();
                ui.activeElement.find('.linked-account[data-id="1"]').find('.link-remove').show();
                ui.activeElement.find('.linked-account[data-id="1"]').find('.link-add').hide();
              } else {
                ui.activeElement.find('.linked-account[data-id="1"]').find('span').hide();
                ui.activeElement.find('.linked-account[data-id="1"]').find('.link-remove').hide();
                ui.activeElement.find('.linked-account[data-id="1"]').find('.link-add').show();
              }
              serverData.user.social.reddit.linked
                ? (ui.activeElement
                    .find('.linked-account[data-id="2"]')
                    .find('span')
                    .text(serverData.user.social.reddit.name),
                  ui.activeElement.find('.linked-account[data-id="2"]').find('span').show(),
                  ui.activeElement.find('.linked-account[data-id="2"]').find('.link-remove').show(),
                  ui.activeElement.find('.linked-account[data-id="2"]').find('.link-add').hide())
                : (ui.activeElement.find('.linked-account[data-id="2"]').find('span').hide(),
                  ui.activeElement.find('.linked-account[data-id="2"]').find('.link-remove').hide(),
                  ui.activeElement.find('.linked-account[data-id="2"]').find('.link-add').show());
              if (serverData.user.social.twitch.linked) {
                ui.activeElement
                  .find('.linked-account[data-id="3"]')
                  .find('span')
                  .text(serverData.user.social.twitch.name);
                ui.activeElement.find('.linked-account[data-id="3"]').find('span').show();
                ui.activeElement.find('.linked-account[data-id="3"]').find('.link-remove').show();
                ui.activeElement.find('.linked-account[data-id="3"]').find('.link-add').hide();
              } else {
                ui.activeElement.find('.linked-account[data-id="3"]').find('span').hide();
                ui.activeElement.find('.linked-account[data-id="3"]').find('.link-remove').hide();
                ui.activeElement.find('.linked-account[data-id="3"]').find('.link-add').show();
              }
            } else if (modal === 'main' && content === 'top') canvasRenderer.loadMyPaintings();
            else if (modal === 'main' && content === 'top-users') ui.loadTopUsers();
            else if (modal === 'request-access') {
              ui.triggerLoader(true);
              setIntervalResult && clearInterval(setIntervalResult);
              api.xhr.req(
                'GET',
                '/api/get-painting-access.php?getStatus=true&painting=' + serverData.painting.id,
                {},
                true,
                /**
                 * HTTP completion callback for /api/get-painting-access.php?getStatus=true&painting=. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Observed DOM operations: text, hide, show, attr, removeClass, addClass.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  ui.triggerLoader(false);
                  if (success) {
                    if (response.auto_accept !== undefined && parseInt(response.auto_accept) > 0) {
                      $('#submit-painting-request-access').text('CLICK TO GET INSTANT ACCESS');
                      $('#form-painting-request-access [name="message"]').hide();
                    } else {
                      $('#submit-painting-request-access').text('REQUEST ACCESS');
                      $('#form-painting-request-access [name="message"]').show();
                    }
                    $('.block-request-access-other').find('p').find('.username').hide();
                    $('.block-request-access-other').find('.reason').hide();
                    if (response.status === -1) {
                      $('.block-request-access-other').hide();
                      $('.block-request-access').show();
                      if (serverData.painting.guild.integration) {
                        $('.block-request-access').find('.guild-form-info').hide();
                        $('.block-request-access').find('.guild-form').show();
                        $('.block-request-access').find('.guild-link').text(serverData.painting.guild.name);
                        $('.block-request-access')
                          .find('.guild-link')
                          .attr('data-tag', serverData.painting.guild.name);
                      } else {
                        $('.block-request-access').find('.guild-form-info').show();
                        $('.block-request-access').find('.guild-form').hide();
                      }
                      serverData.painting.twitch.integration
                        ? ($('.block-request-access').find('.twitch-form-info').hide(),
                          $('.block-request-access').find('.twitch-form').show(),
                          $('.block-request-access')
                            .find('.twitch-link')
                            .text('twitch.tv/' + serverData.painting.twitch.name),
                          $('.block-request-access')
                            .find('.twitch-link')
                            .attr('href', 'https://twitch.tv/' + serverData.painting.twitch.name))
                        : ($('.block-request-access').find('.twitch-form-info').show(),
                          $('.block-request-access').find('.twitch-form').hide());
                    } else if (response.status === 1) ui.closeModal();
                    else if (response.status === 2) {
                      $('.block-request-access-other').show();
                      $('.block-request-access').hide();
                      $('.block-request-access-other')
                        .find('p')
                        .find('.message')
                        .removeClass('c-error')
                        .removeClass('c-warning');
                      parseInt(response.daysLeft) > -1
                        ? ($('.block-request-access-other')
                            .find('p')
                            .find('.message')
                            .text(
                              'You have been suspended temporarily from this painting ' +
                                (response.user ? ' by ' : '')
                            ),
                          $('.block-request-access-other').find('.tmpban').show(),
                          $('.block-request-access-other')
                            .find('.tmpban .message')
                            .text(
                              'Your access to this painting will be restored in ' +
                                response.daysLeft +
                                ' day' +
                                (parseInt(response.daysLeft) != 1 ? 's' : '')
                            )
                            .show(),
                          showNotification(
                            'error',
                            'Access denied',
                            'You have been suspended temporarily from this painting'
                          ))
                        : (showNotification(
                            'error',
                            'Access denied',
                            'Your previous request to access this painting has been declined'
                          ),
                          $('.block-request-access-other')
                            .find('p')
                            .find('.message')
                            .text(
                              'Your previous request to access this painting has been declined' +
                                (response.user ? ' by ' : '')
                            ),
                          $('.block-request-access-other').find('.tmpban').hide());
                      $('.block-request-access-other').find('p').find('.message').addClass('c-error');
                      if (response.user) {
                        $('.block-request-access-other')
                          .find('p')
                          .find('.username')
                          .text(response.user)
                          .show();
                      } else $('.block-request-access-other').find('p').find('.username').hide();
                      if (response.reason) {
                        $('.block-request-access-other').find('.reason span').text(response.reason);
                        $('.block-request-access-other').find('.reason').show();
                      } else $('.block-request-access-other').find('.reason').hide();
                      $('.block-request-access').find('.guild-form-info').hide();
                      $('.block-request-access').find('.guild-form').hide();
                      $('.block-request-access').find('.twitch-form-info').hide();
                      $('.block-request-access').find('.twitch-form').hide();
                    } else {
                      $('.block-request-access-other').show();
                      $('.block-request-access').show();
                      $('.block-request-access-other')
                        .find('p')
                        .find('.message')
                        .removeClass('c-error')
                        .removeClass('c-warning');
                      $('.block-request-access-other')
                        .find('p')
                        .find('.message')
                        .text('Your request to access this painting is still pending');
                      $('.block-request-access-other').find('p').find('.message').addClass('c-warning');
                      showNotification(
                        'warning',
                        'Access request pending',
                        'Your request to access this painting is still pending'
                      );
                      if (serverData.painting.guild.integration) {
                        $('.block-request-access').find('.guild-form-info').hide();
                        $('.block-request-access').find('.guild-form').show();
                        $('.block-request-access').find('.guild-link').text(serverData.painting.guild.name);
                        $('.block-request-access')
                          .find('.guild-link')
                          .attr('data-tag', serverData.painting.guild.name);
                      } else {
                        $('.block-request-access').find('.guild-form-info').show();
                        $('.block-request-access').find('.guild-form').hide();
                      }
                      if (serverData.painting.twitch.integration) {
                        $('.block-request-access').find('.twitch-form-info').hide();
                        $('.block-request-access').find('.twitch-form').show();
                        $('.block-request-access')
                          .find('.twitch-link')
                          .text('twitch.tv/' + serverData.painting.twitch.name);
                        $('.block-request-access')
                          .find('.twitch-link')
                          .attr('href', 'https://twitch.tv/' + serverData.painting.twitch.name);
                      } else {
                        $('.block-request-access').find('.twitch-form-info').show();
                        $('.block-request-access').find('.twitch-form').hide();
                      }
                    }
                    if (serverData.painting.isEmblem) {
                      ui.activeElement.find('.block-request-access #form-painting-request-access').hide();
                      ui.activeElement.find('.block-request-access > h1').hide();
                      ui.activeElement.find('.h').hide();
                      ui.activeElement.find('.twitch-form-info').hide();
                      ui.activeElement.find('.guild-form-info').hide();
                      ui.activeElement.find('.managers').hide();
                    } else {
                      ui.activeElement.find('.block-request-access #form-painting-request-access').show();
                      ui.activeElement.find('.block-request-access > h1').show();
                      ui.activeElement.find('.h').show();
                      ui.activeElement.find('.managers').show();
                    }
                  } else showNotification('error', 'Error', response.message);
                }
              );
            } else if (modal === 'painting') {
              if (content === 'pending') canvasRenderer.fetchPaintingAccess(0, 0);
              else if (content === 'accepted') canvasRenderer.fetchPaintingAccess(1, 0);
              else if (content === 'declined') {
                canvasRenderer.fetchPaintingAccess(2, 0);
              } else content === 'moderators' && canvasRenderer.fetchPaintingModerators();
            } else if (modal === 'auth') {
              if (content === 'login') {
                ui.activeElement.find('.box-header > span').html('Log In');
              } else if (content === 'register')
                ui.activeElement.find('.box-header > span').html('Create Account');
              else
                content === 'forgot' && ui.activeElement.find('.box-header > span').html('Forgot Password');
            }
            ui.activeContent.show();
            ui.moreContentBelow.hide();
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Observed DOM operations: ui.moreContentBelow.show.
               */
              function () {
                var activeContent = ui.activeContent;
                if (
                  activeContent[0].scrollHeight - activeContent.scrollTop() <=
                  parseInt(activeContent.outerHeight()) + 80
                ) {
                } else ui.moreContentBelow.show();
              },
              1000
            );
          }
        },
        /**
         * Modal state transition boundary. Existing active content, target selectors, loaders and permission-driven content initialization are coordinated here. A modal change can trigger an asynchronous loader; visible presentation must not be taken as evidence that its request already completed.
         *
         * Shared/receiver state written: ui.activeCaptcha, ui.previousActiveElement, ui.previousActiveContent, ui.activeElement, ui.activeContent.
         *
         * Observed DOM operations: hide, ui.activeElement.css, ui.elem.container.css, css, removeClass, text, show, html (plus 2 other observed operations).
         *
         * Input bindings: target, content, extra, paintingEditData. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* Switch visible modal content through the existing loading and permission paths. */
        openModal: function (target, content, extra, paintingEditData) {
          $('#profile').hide();
          target === 'captcha' ? (ui.activeCaptcha = true) : (ui.activeCaptcha = false);
          ui.activeElement &&
            ((ui.previousActiveElement = ui.activeElement),
            (ui.previousActiveContent = ui.activeContent),
            ui.activeElement.css('display', 'none'),
            ui.elem.container.css('display', 'none'),
            (ui.activeElement = null),
            (ui.activeContent = null));
          ui.activeElement = ui.elem.container.find('.box[data-id="' + target + '"]');
          ui.activeElement.css('display', 'flex');
          ui.activeElement.find('.box-content .input-error').css('visibility', 'hidden');
          ui.activeElement.find('.box-content input.error, .box-content textarea.error').removeClass('error');
          ui.activeElement.find('.box-content .input-error').text('');
          if (target == 'main') {
            if (content == 'top') {
              if (localStorage) {
                $('.attention').hide();
                if (paintingReloadInterval) {
                  clearInterval(paintingReloadInterval);
                }
                localStorage.setItem('attention-notif', true);
              }
            }
            if (serverData.user.connected) {
              ui.activeElement.find('.box-header > div').show();
              var html = '';
              for (var key in serverData.user.icons) {
                html += '<img src="/img/badges/' + serverData.user.icons[key] + '.png" class="badge">';
              }
              serverData.user.guild != ''
                ? (ui.activeElement
                    .find('.box-header > div > a[data-id="guild"]')
                    .html('' + serverData.user.guild + ''),
                  ui.activeElement
                    .find('.box-header > div > a[data-id="guild"]')
                    .attr('data-tag', serverData.user.guild),
                  ui.activeElement.find('.box-header > div > .bull').show())
                : (ui.activeElement.find('.box-header > div > a[data-id="guild"]').text(''),
                  ui.activeElement.find('.box-header > div > .bull').hide());
              ui.activeElement
                .find('.box-header .coins-infos span')
                .text(serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : ''));
              if (serverData.user.name === '') {
                ui.activeElement
                  .find('.box-header > div > a[data-id="username"]')
                  .text('Click to create your username');
                ui.activeElement.find('.box-header > div > a[data-id="username"]').addClass('open-modal');
                ui.activeElement
                  .find('.box-header > div > a[data-id="username"]')
                  .attr('data-target', 'username');
                ui.activeElement
                  .find('.box-header > div > a[data-id="username"]')
                  .attr('data-content', 'username');
              } else {
                ui.activeElement.find('.box-header > div > a[data-id="username"]').text(serverData.user.name);
                ui.activeElement
                  .find('.box-header > div > a[data-id="username"]')
                  .attr('data-profile', serverData.user.name.toLowerCase());
                ui.activeElement.find('.box-header > div > a[data-id="username"]').removeClass('open-modal');
                var latestEffectExpiration = Math.max(
                  parseInt(serverData.user.rainbowTime),
                  parseInt(serverData.user.xmasTime),
                  parseInt(serverData.user.halloweenTime)
                );
                if (
                  latestEffectExpiration === parseInt(serverData.user.rainbowTime) &&
                  parseInt(serverData.user.rainbowTime) > nowSeconds()
                )
                  ui.activeElement.find('.box-header > div > a[data-id="username"]').addClass('rainbowText');
                else if (
                  latestEffectExpiration === parseInt(serverData.user.xmasTime) &&
                  parseInt(serverData.user.xmasTime) > nowSeconds()
                ) {
                  ui.activeElement.find('.box-header > div > a[data-id="username"]').addClass('xmasText');
                  ui.activeElement
                    .find('.box-header > div > a[data-id="username"]')
                    .html(holidayTextHtml(serverData.user.name));
                } else
                  latestEffectExpiration === parseInt(serverData.user.halloweenTime) &&
                  parseInt(serverData.user.halloweenTime) > nowSeconds()
                    ? ui.activeElement.find('.box-header > div > a[data-id="username"]').addClass('halloween')
                    : ui.activeElement
                        .find('.box-header > div > a[data-id="username"]')
                        .removeClass('xmasText')
                        .removeClass('halloween');
              }
              ui.activeElement.find('.box-header > div > span').html(html);
              ui.activeElement.find('.box-header > button').hide();
              ui.activeElement.find('.box-header > div > a').show();
              ui.activeElement.find('.box-header > div > span').show();
            } else {
              ui.activeElement.find('.box-header > div').hide();
              ui.activeElement.find('.box-header > button').show();
            }
          }
          content && ui.updateActiveContent(target, content, extra, paintingEditData);
          ui.elem.container.css('display', 'block');
        },
        triggerChooseModal: function () {
          setTimeout(function () {
            if (!ui.activeElement) {
              ui.openModal('welcome-choose', 'welcome-choose');
              localStorage.setItem('welcome-choice', true);
            } else {
              ui.triggerChooseModal();
            }
          }, 20000);
        },
        /**
         * Restore the original modal visibility/active-state behavior. Related tool and painting input state is shared with the rest of the application, so closing a dialog can affect which later input handlers run.
         *
         * Shared/receiver state written: ui.activeElement, ui.previous.modal, ui.previous.content, ui.previous.extra, ui.selectors.modal, ui.selectors.content, ui.selectors.extra.
         *
         * Observed DOM operations: ui.activeElement.css, ui.elem.container.css.
         */
        closeModal: function () {
          if (ui.activeElement) {
            if (ui.selectors.modal === 'welcome') {
              localStorage.setItem('welcome-terms', true);
              ui.triggerChooseModal();
            }
            ui.activeElement.css('display', 'none');
            ui.elem.container.css('display', 'none');
            ui.activeElement = null;
            ui.previous.modal = ui.selectors.modal;
            ui.previous.content = ui.selectors.content;
            ui.previous.extra = ui.selectors.extra;
            ui.selectors.modal = '';
            ui.selectors.content = '';
            ui.selectors.extra = '';
          }
        },
        goBackFromCaptcha: function () {
          ui.activeCaptcha && ui.openModal(ui.previous.modal, ui.previous.content, ui.previous.extra, true);
        },
        /**
         * Shared/receiver state written: ui.selectors.extra.
         *
         * Observed DOM operations: text, show, hide, val, removeClass, addClass.
         *
         * Input bindings: skipLoad. Names describe inferred roles; protocol field names are preserved separately.
         */
        loadPaintingCreateOrEdit: function (skipLoad) {
          if (skipLoad) return;
          else if (serverData.user.settings.painting.isOwner && ui.selectors.extra !== 'create') {
            ui.selectors.extra = 'edit';
            ui.activeElement.find('h1 span').text('Edit Painting');
            ui.activeElement
              .find('button.open-modal[data-target="main"][data-content="painting"][data-extra="create"]')
              .show();
            ui.activeElement
              .find('button.open-modal[data-target="main"][data-content="painting"][data-extra="edit"]')
              .hide();
            ui.elem.settings.painting.find('#submit-settings-painting').text('SAVE CHANGES');
            ui.elem.settings.painting.find('input[name="id"]').val(serverData.painting.id);
            ui.elem.settings.painting.find('input[name="title"]').val(serverData.painting.name);
            ui.elem.settings.painting
              .find('textarea[name="description"]')
              .val(serverData.painting.description);
            ui.elem.settings.painting.find('textarea[name="rules"]').val(serverData.painting.rules);
            ui.elem.settings.painting.find('.replacePainting').show();
            ui.elem.settings.painting.find('#form-painting-delete').show();
            serverData.user.premium.active
              ? (ui.elem.settings.painting.find('input[name="sizeX"]').val(serverData.painting.width),
                ui.elem.settings.painting.find('input[name="sizeY"]').val(serverData.painting.height),
                ui.elem.settings.painting.find('input[name="cooldown"]').val(serverData.painting.cooldown),
                ui.elem.settings.painting
                  .find('input[name="autoAcceptTime"]')
                  .val(serverData.painting.autoAcceptTime))
              : (ui.elem.settings.painting.find('input[name="sizeX"]').val(appState.painting.width),
                ui.elem.settings.painting.find('input[name="sizeY"]').val(appState.painting.height),
                ui.elem.settings.painting.find('input[name="cooldown"]').val(appState.painting.cooldown),
                ui.elem.settings.painting
                  .find('input[name="autoAcceptTime"]')
                  .val(appState.painting.autoAcceptTime));
            ui.settingsPaintingSelectAccess(
              ui.elem.settings.painting.find(
                '.input-radio[data-name="access"][data-value="' + serverData.painting.type + '"]'
              ),
              true,
              2
            );
            ui.settingsPaintingSelectBackground(
              ui.elem.settings.painting.find(
                '.settings-painting-palette[data-name="background"] > div > a[data-value="' +
                  serverData.painting.background +
                  '"]'
              ),
              true
            );
            ui.elem.settings.painting
              .find('.settings-painting-palette[data-name="allowedColors"] > div')
              .removeClass('selected');
            if (serverData.user.premium.active)
              for (var key in appState.painting.palette.colors) {
                if ($.inArray(parseInt(key), serverData.painting.palette) !== -1) {
                  ui.elem.settings.painting
                    .find(
                      '.settings-painting-palette[data-name="allowedColors"] > div > a[data-value="' +
                        key +
                        '"]'
                    )
                    .parent()
                    .addClass('selected');
                }
              }
            else
              ui.elem.settings.painting
                .find('.settings-painting-palette[data-name="allowedColors"] > div')
                .addClass('selected');
            var entries = [];
            $(document)
              .find(
                '#form-settings-painting .settings-painting-palette[data-name="allowedColors"] > div.selected > a'
              )
              .each(
                /**
                 * Observed DOM operations: attr.
                 *
                 * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
                 */
                function () {
                  entries.push(parseInt($(this).attr('data-value')));
                }
              );
            ui.elem.settings.painting
              .find('input[type="hidden"][name="allowedColors"]')
              .val(entries.join(','));
            if (!serverData.painting.protection || !serverData.user.premium.active) {
              ui.elem.container.find('.input-checkbox[data-name="protection"]').removeClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="protection"]')
                .parent()
                .find('input[name="protection"]')
                .val(0);
            } else {
              ui.elem.container.find('.input-checkbox[data-name="protection"]').removeClass('selected');
              ui.elem.container.find('.input-checkbox[data-name="protection"]').addClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="protection"]')
                .parent()
                .find('input[name="protection"]')
                .val(1);
            }
            !serverData.painting.shopItems
              ? (ui.elem.container.find('.input-checkbox[data-name="shop-items"]').removeClass('selected'),
                ui.elem.container
                  .find('.input-checkbox[data-name="shop-items"]')
                  .parent()
                  .find('input[name="shop-items"]')
                  .val(0))
              : (ui.elem.container.find('.input-checkbox[data-name="shop-items"]').removeClass('selected'),
                ui.elem.container.find('.input-checkbox[data-name="shop-items"]').addClass('selected'),
                ui.elem.container
                  .find('.input-checkbox[data-name="shop-items"]')
                  .parent()
                  .find('input[name="shop-items"]')
                  .val(1));
            if (!serverData.painting.nsfw) {
              ui.elem.container.find('.input-checkbox[data-name="nsfw"]').removeClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="nsfw"]')
                .parent()
                .find('input[name="nsfw"]')
                .val(0);
            } else {
              ui.elem.container.find('.input-checkbox[data-name="nsfw"]').removeClass('selected');
              ui.elem.container.find('.input-checkbox[data-name="nsfw"]').addClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="nsfw"]')
                .parent()
                .find('input[name="nsfw"]')
                .val(1);
            }
            if (!serverData.painting.discordRequired || !serverData.user.premium.active) {
              ui.elem.container.find('.input-checkbox[data-name="discord-required"]').removeClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="discord-required"]')
                .parent()
                .find('input[name="discord-required"]')
                .val(0);
            } else {
              ui.elem.container.find('.input-checkbox[data-name="discord-required"]').removeClass('selected');
              ui.elem.container.find('.input-checkbox[data-name="discord-required"]').addClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="discord-required"]')
                .parent()
                .find('input[name="discord-required"]')
                .val(1);
            }
            ui.elem.settings.painting.find('a[data-name="template"]').removeClass('selected');
            ui.elem.settings.painting
              .find('a[data-name="template"][data-id="' + serverData.painting.template + '"]')
              .addClass('selected');
            ui.elem.settings.painting
              .find('.brush-size')
              .text(serverData.painting.brush.size + ' x ' + serverData.painting.brush.size);
            ui.elem.settings.painting
              .find('input[type="range"][name="brush"]')
              .val(serverData.painting.brush.size);
          } else {
            !serverData.user.connected && alert('Note: You need to log in before creating your Painting');
            ui.selectors.extra = 'create';
            ui.elem.settings.painting.find('input[name="id"]').val('');
            ui.activeElement.find('h1 span').text('New Painting');
            ui.activeElement
              .find('button.open-modal[data-target="main"][data-content="painting"][data-extra="create"]')
              .hide();
            if (serverData.user.settings.painting.isOwner) {
              ui.activeElement
                .find('button.open-modal[data-target="main"][data-content="painting"][data-extra="edit"]')
                .show();
            } else
              ui.activeElement
                .find('button.open-modal[data-target="main"][data-content="painting"][data-extra="edit"]')
                .hide();
            ui.elem.settings.painting.find('.replacePainting').hide();
            ui.elem.settings.painting.find('input[name="title"]').val('My Painting');
            ui.elem.settings.painting.find('textarea[name="description"]').val('');
            ui.elem.settings.painting.find('textarea[name="rules"]').val('');
            ui.elem.settings.painting.find('input[name="sizeX"]').val(appState.painting.width);
            ui.elem.settings.painting.find('input[name="sizeY"]').val(appState.painting.height);
            ui.elem.settings.painting.find('input[name="cooldown"]').val(appState.painting.cooldown);
            ui.elem.settings.painting
              .find('input[name="autoAcceptTime"]')
              .val(appState.painting.autoAcceptTime);
            serverData.user.premium.active && ui.elem.settings.painting.find('input[name="cooldown"]').val(0);
            ui.settingsPaintingSelectAccess(
              ui.elem.settings.painting.find('.input-radio[data-name="access"][data-value="1"]'),
              true,
              1
            );
            ui.settingsPaintingSelectBackground(
              ui.elem.settings.painting.find(
                '.settings-painting-palette[data-name="background"] > div > a[data-value="' +
                  $.inArray(appState.painting.background, appState.painting.palette.colors) +
                  '"]'
              ),
              true
            );
            ui.elem.settings.painting
              .find('.settings-painting-palette[data-name="allowedColors"] > div')
              .removeClass('selected');
            ui.elem.settings.painting
              .find('.settings-painting-palette[data-name="allowedColors"] > div')
              .addClass('selected');
            ui.elem.settings.painting.find('input[name="allowedColors"]').val('');
            var entries = [];
            $(document)
              .find(
                '#form-settings-painting .settings-painting-palette[data-name="allowedColors"] > div.selected > a'
              )
              .each(
                /**
                 * Observed DOM operations: attr.
                 *
                 * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
                 */
                function () {
                  entries.push(parseInt($(this).attr('data-value')));
                }
              );
            ui.elem.settings.painting
              .find('input[type="hidden"][name="allowedColors"]')
              .val(entries.join(','));
            ui.elem.settings.painting.find('#form-painting-delete').hide();
            ui.elem.settings.painting.find('.brush-size').text('1 x 1');
            ui.elem.settings.painting.find('input[type="range"][name="brush"]').val(1);
            ui.elem.settings.painting.find('input[name="template"]').val(0);
            ui.elem.settings.painting.find('a[data-name="template"]').removeClass('selected');
            ui.elem.settings.painting.find('a[data-name="template"][data-id="0"]').addClass('selected');
            ui.elem.settings.painting.find('#submit-settings-painting').text('CREATE NEW PAINTING');
          }
        },
        settingsPaintingSelectAccess: function (checkbox, enabled, accessType) {
          var text = 'access',
            inputValue = parseInt(checkbox.attr('data-value')),
            useDefaultPaintingType = false;
          if (inputValue === 5 && !serverData.user.social.twitch.linked) {
            useDefaultPaintingType = true;
            if (!enabled) {
              if (
                confirm(
                  "To use this option, Pixelplace needs to access your Twitch subscribers list. You are about to be redirected to Twitch to authorize this. This data will be private and used just for verifications purpose when someone access the painting. We won't disclose any of it. Would you like to continue?"
                )
              ) {
                window.location.replace('/api/sso.php?type=3&action=login');
                return;
              }
            }
          } else if (serverData.user.premium.active) {
          } else if (inputValue !== appState.painting.type) {
            useDefaultPaintingType = true;
            !enabled &&
              showNotification('error', 'You need to be a Premium Subscriber to modify this setting');
          } else {
            ui.triggerFormInputError('access', '');
          }
          if (useDefaultPaintingType) {
            inputValue = parseInt(appState.painting.type);
          }
          if (inputValue === 2 && serverData.painting.guild.integration) {
            accessType === 2 && enabled && (inputValue = 4);
          }
          inputValue === 2 &&
            serverData.painting.twitch.integration &&
            accessType === 2 &&
            enabled &&
            (inputValue = 5);
          checkbox
            .parent()
            .find('input[type="hidden"][name="' + text + '"]')
            .val(inputValue);
          checkbox
            .parent()
            .find('.input-radio[data-name="' + text + '"]')
            .removeClass('selected');
          checkbox
            .parent()
            .find('.input-radio[data-name="' + text + '"][data-value="' + inputValue + '"]')
            .addClass('selected');
          inputValue == 2 ||
          inputValue == 4 ||
          inputValue == 5 ||
          (accessType === 2 &&
            enabled &&
            inputValue == 2 &&
            (serverData.painting.guild.integration || serverData.painting.twitch.integration))
            ? (ui.elem.settings.painting.find('.rules').show(),
              ui.elem.settings.painting.find('input[name="autoAcceptTime"]').show(),
              ui.elem.settings.painting.find('.autoAcceptTime').show(),
              ui.elem.settings.painting.find('.discordRequired').show(),
              ui.elem.settings.painting.find('.input-checkbox[data-name="discord-required"]').show())
            : (ui.elem.settings.painting.find('.rules').hide(),
              ui.elem.settings.painting.find('input[name="autoAcceptTime"]').hide(),
              ui.elem.settings.painting.find('.autoAcceptTime').hide(),
              ui.elem.settings.painting.find('.input-checkbox[data-name="discord-required"]').hide(),
              ui.elem.settings.painting.find('.discordRequired').hide());
        },
        settingsPaintingSelectBackground: function (radioButton, skipSave) {
          var inputValue = radioButton.attr('data-value');
          serverData.user.premium.active
            ? appState.painting.palette.colors[inputValue] !== undefined
              ? (ui.elem.settings.painting.find('input[type="hidden"][name="background"]').val(inputValue),
                ui.elem.settings.painting
                  .find('.settings-painting-palette[data-name="background"] > div')
                  .removeClass('selected'),
                ui.elem.settings.painting
                  .find(
                    '.settings-painting-palette[data-name="background"] > div > a[data-value="' +
                      inputValue +
                      '"]'
                  )
                  .parent()
                  .addClass('selected'))
              : !skipSave && showNotification('error', 'Color not found')
            : !skipSave &&
              showNotification('error', 'You need to be a Premium Subscriber to modify this setting');
        },
        generateSettingsPaintingsPalettes: function () {
          var html = '',
            entries = [];
          for (var key in appState.painting.palette.colors) {
            html +=
              '<div><a href="#" data-value="' +
              key +
              '" style="background-color: ' +
              appState.painting.palette.colors[key] +
              '"></a></div>';
            entries.push(key);
          }
          ui.elem.container
            .find('.box[data-id="main"] .box-content[data-id="painting"] .settings-painting-palette')
            .html(html);
          ui.elem.container
            .find(
              '.box[data-id="main"] .box-content[data-id="painting"] .settings-painting-palette[data-name="background"] > div'
            )
            .eq(0)
            .addClass('selected');
          ui.elem.container
            .find(
              '.box[data-id="main"] .box-content[data-id="painting"] .settings-painting-palette[data-name="allowedColors"] > div'
            )
            .addClass('selected');
          ui.elem.container
            .find(
              '.box[data-id="main"] .box-content[data-id="painting"] input[type="hidden"][data-name="background"]'
            )
            .val(0);
          ui.elem.container
            .find(
              '.box[data-id="main"] .box-content[data-id="painting"] input[type="hidden"][data-name="allowedColors"]'
            )
            .val(entries.join(','));
        },
        /**
         * Persist the current browser-side preferences through the original storage path. These are client preferences, not authority to change server account/painting permissions.
         *
         * Direct network calls: POST /api/post-settings.php.
         */
        saveUserSettings: function () {
          if (canvasRenderer.settingsLoaded) {
            var socialVisibilitySettings = {};
            socialVisibilitySettings.displaySocial = serverData.user.settings.displaySocial ? true : false;
            socialVisibilitySettings.painting = {};
            socialVisibilitySettings.chat = {};
            socialVisibilitySettings.chat.invisible = serverData.user.settings.chat.invisible;
            socialVisibilitySettings.chat.timestamps = serverData.user.settings.chat.timestamps;
            socialVisibilitySettings.chat.notifications = serverData.user.settings.chat.notifications;
            socialVisibilitySettings.chat.friendsNotifications =
              serverData.user.settings.chat.friendsNotifications;
            socialVisibilitySettings.chat.guildTags = serverData.user.settings.chat.guildTags;
            socialVisibilitySettings.painting.protectionFlashing =
              serverData.user.settings.painting.protectionFlashing;
            socialVisibilitySettings.painting.zoomDisplay = serverData.user.settings.painting.zoomDisplay;
            var requestData = socialVisibilitySettings;
            api.xhr.req('POST', '/api/post-settings.php', requestData, true, function (success, response) {});
          }
        },
        /**
         * Apply a tool or settings change to the current shared state and its UI. Some preferences also persist or reset other tool modes. The optional arguments control the original behavior and must not be collapsed into an unconditional save.
         *
         * Shared/receiver state written: alternativeMobileDrawing, serverData.user.settings.painting.liveTracking, serverData.user.settings.painting.bot, serverData.user.settings.painting.saveTracking, pixelHistoryByPosition, trackedUsernames, serverData.user.settings.painting.gridDisplay, serverData.user.settings.painting.lockPainting (plus 8 other observed operations).
         *
         * Observed DOM operations: removeClass, show, elements.placeholderMobile.show, addClass, hide, elements.placeholderMobile.hide, downloadLink.remove, saveTrackingButton.hide (plus 2 other observed operations).
         *
         * Scheduled work: setTimeout (500 ms), setTimeout (4000 ms).
         *
         * Input bindings: tool, enabled, save. Names describe inferred roles; protocol field names are preserved separately.
         */
        /* Apply the requested tool setting and its existing persistence behavior. */
        onChangeTools: function (tool, enabled, save) {
          if (tool === 'tools-mobile-alt') {
            if ((enabled !== undefined && enabled) || (enabled === undefined && alternativeMobileDrawing)) {
              alternativeMobileDrawing = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              if (pointer.touchDevice) {
                $('#mobileplace').show();
                elements.placeholderMobile.show();
              }
              localStorage && localStorage.setItem('mobile-alt-drawing', 0);
              !save && showNotification('warning', 'Tools', 'Alternate drawing disabled', false, true);
            } else {
              alternativeMobileDrawing = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              pointer.touchDevice && ($('#mobileplace').hide(), elements.placeholderMobile.hide());
              localStorage && localStorage.setItem('mobile-alt-drawing', nowSeconds());
              !save && showNotification('success', 'Tools', 'Alternate drawing enabled', false, true);
            }
          } else if (tool === 'tools-display-tracking') {
            if (!serverData.user.premium.active) {
              !save &&
                (ui.openModal('main', 'shop'),
                showNotification(
                  'warning',
                  'Warning',
                  'You need to be a premium subscriber to use the live users tracking feature'
                ));
              return;
            } else if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.painting.liveTracking)
            ) {
              serverData.user.settings.painting.liveTracking = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              setTimeout(
                /**
                 * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                 *
                 * Observed DOM operations: remove.
                 */
                function () {
                  for (var key in canvasRenderer.liveTrackingUsers) {
                    canvasRenderer.element.move.find('.track[data-id="' + key + '"]').remove();
                    delete canvasRenderer.liveTrackingUsers[key];
                  }
                },
                500
              );
              !save && showNotification('warning', 'Tools', 'Live tracking disabled', false, true);
            } else {
              serverData.user.settings.painting.liveTracking = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              if (!save) {
                showNotification('success', 'Tools', 'Live tracking enabled', false, true);
              }
            }
          } else if (tool === 'tools-display-bot') {
            if (!serverData.user.premium.active) {
              if (!save) {
                ui.openModal('main', 'shop');
                showNotification(
                  'warning',
                  'Warning',
                  'You need to be a premium subscriber to use the BOT feature'
                );
              }
              return;
            } else if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.painting.bot)
            ) {
              serverData.user.settings.painting.bot = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              toggleImagePainterPreview();
              !save && showNotification('warning', 'Tools', 'Bot disabled', false, true);
            } else if (parseInt(serverData.painting.id) === 8)
              showNotification('error', 'Tools', 'Bots forbidden on this painting', false, true);
            else {
              serverData.user.settings.painting.bot = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              toggleImagePainterPreview();
              !save && showNotification('success', 'Tools', 'Bot enabled', false, true);
            }
          } else if (tool === 'tools-display-save-tracking') {
            if (!serverData.user.premium.active) {
              !save &&
                (ui.openModal('main', 'shop'),
                showNotification(
                  'warning',
                  'Warning',
                  'You need to be a premium subscriber to use the save tracking feature'
                ));
              return;
            } else if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.painting.saveTracking)
            ) {
              var confirmResult = null;
              if (!save) {
                confirmResult = confirm('Would you like to download the saved data (JSON)?');
              }
              if (confirmResult) {
                var settingsChanges = {};
                settingsChanges.names = trackedUsernames;
                settingsChanges.data = pixelHistoryByPosition;
                var settingsPayload = settingsChanges,
                  url = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settingsPayload)),
                  downloadLink = document.createElement('a');
                downloadLink.setAttribute('href', url);
                downloadLink.setAttribute('download', 'save-tracking.json');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
              }
              var disableSaveTrackingAndResetDataConfirmResult = null;
              if (!save) {
                disableSaveTrackingAndResetDataConfirmResult = confirm(
                  'Disable save tracking and reset data?'
                );
              }
              if (save || disableSaveTrackingAndResetDataConfirmResult) {
                serverData.user.settings.painting.saveTracking = false;
                ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
                pixelHistoryByPosition = {};
                trackedUsernames = {};
                saveTrackingButton.hide();
                if (!save) {
                  showNotification('warning', 'Tools', 'Save tracking disabled', false, true);
                }
              }
            } else {
              serverData.user.settings.painting.saveTracking = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              !save && showNotification('success', 'Tools', 'Save tracking enabled', false, true);
            }
          } else if (tool === 'tools-display-grid')
            (enabled !== undefined && enabled) ||
            (enabled === undefined && serverData.user.settings.painting.gridDisplay)
              ? ((serverData.user.settings.painting.gridDisplay = false),
                ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected'),
                canvasRenderer.element.grid.hide(),
                !save && showNotification('warning', 'Tools', 'Grid hidden', false, true))
              : ((serverData.user.settings.painting.gridDisplay = true),
                ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected'),
                ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected'),
                canvasRenderer.element.grid.show(),
                !save && showNotification('success', 'Tools', 'Grid displayed', false, true));
          else if (tool === 'tools-lock-painting') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.painting.lockPainting)
            ) {
              serverData.user.settings.painting.lockPainting = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              if (!save) {
                showNotification('warning', 'Tools', 'Painting movement enabled', false, true);
              }
            } else {
              serverData.user.settings.painting.lockPainting = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              !save && showNotification('success', 'Tools', 'Painting movement disabled', false, true);
            }
          } else if (tool === 'tools-display-notifications') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.chat.notifications)
            ) {
              serverData.user.settings.chat.notifications = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              !save && showNotification('warning', 'Tools', 'Chat notifications disabled', false, true);
            } else {
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              serverData.user.settings.chat.notifications = true;
              !save && showNotification('success', 'Tools', 'Chat notifications enabled', false, true);
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-display-friends-notifications') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.chat.friendsNotifications)
            ) {
              serverData.user.settings.chat.friendsNotifications = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              !save && showNotification('warning', 'Tools', 'Friends notifications disabled', false, true);
            } else {
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              serverData.user.settings.chat.friendsNotifications = true;
              if (!save) {
                showNotification('success', 'Tools', 'Friends notifications enabled', false, true);
              }
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-display-protection-flashing') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.painting.protectionFlashing)
            ) {
              serverData.user.settings.painting.protectionFlashing = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              !save && showNotification('warning', 'Tools', 'Protection flashing disabled', false, true);
            } else {
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              serverData.user.settings.painting.protectionFlashing = true;
              if (!save) {
                showNotification('success', 'Tools', 'Protection flashing enabled', false, true);
              }
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-display-zoom') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.painting.zoomDisplay)
            ) {
              serverData.user.settings.painting.zoomDisplay = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              $('#coordinates').removeClass('zoom');
              if (!save) {
                showNotification('warning', 'Tools', 'Zoom buttons disabled', false, true);
              }
              $('#menu-buttons-right-top a[data-id="zoom-in"]').hide();
              $('#menu-buttons-right-top a[data-id="zoom-out"]').hide();
            } else {
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              serverData.user.settings.painting.zoomDisplay = true;
              $('#coordinates').removeClass('zoom').addClass('zoom');
              $('#menu-buttons-right-top a[data-id="zoom-in"]').show();
              $('#menu-buttons-right-top a[data-id="zoom-out"]').show();
              !save && showNotification('success', 'Tools', 'Zoom buttons enabled (top right)', false, true);
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-display-guilds') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.chat.guildTags)
            ) {
              serverData.user.settings.chat.guildTags = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              chat.elem.container.find('.messages .row .guild').hide();
              !save &&
                showNotification('warning', 'Tools', 'Guild tags are now hidden from chat', false, true);
            } else {
              serverData.user.settings.chat.guildTags = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              chat.elem.container.find('.messages .row .guild').show();
              !save &&
                showNotification(
                  'success',
                  'Tools',
                  'Guild tags are now being displayed in chat',
                  false,
                  true
                );
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-display-timestamp') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.chat.timestamps)
            ) {
              serverData.user.settings.chat.timestamps = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              chat.elem.container.find('.messages .row .time').hide();
              !save &&
                showNotification('warning', 'Tools', 'Timestamps are now hidden from chat', false, true);
            } else {
              serverData.user.settings.chat.timestamps = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              chat.elem.container.find('.messages .row .time').show();
              !save &&
                showNotification('success', 'Tools', 'Timestamps are now displayed in chat', false, true);
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-invisible-mode') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.chat.invisible)
            ) {
              serverData.user.settings.chat.invisible = false;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              !save &&
                (showNotification(
                  'warning',
                  'Tools',
                  'Invisible mode disabled, reloading the page in a few seconds...',
                  false,
                  true
                ),
                setTimeout(function () {
                  window.location.reload();
                }, 4000));
            } else {
              serverData.user.settings.chat.invisible = true;
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.tools.find('a[data-name="' + tool + '"]').addClass('selected');
              !save &&
                (showNotification(
                  'success',
                  'Tools',
                  'Invisible mode enabled, reloading the page in a few seconds...',
                  false,
                  true
                ),
                setTimeout(function () {
                  window.location.reload();
                }, 4000));
            }
            ui.saveUserSettings();
          } else if (tool === 'tools-display-social') {
            if (
              (enabled !== undefined && enabled) ||
              (enabled === undefined && serverData.user.settings.displaySocial)
            ) {
              serverData.user.settings.displaySocial = false;
              ui.elem.settings.account.find('a[data-name="' + tool + '"]').removeClass('selected');
              !save &&
                showNotification(
                  'success',
                  'Account',
                  'Social accounts are now hidden from your profile',
                  false,
                  true
                );
            } else {
              serverData.user.settings.displaySocial = true;
              ui.elem.settings.account.find('a[data-name="' + tool + '"]').removeClass('selected');
              ui.elem.settings.account.find('a[data-name="' + tool + '"]').addClass('selected');
              if (!save) {
                showNotification(
                  'warning',
                  'Account',
                  'Social accounts are now displayed on your profile',
                  false,
                  true
                );
              }
            }
            ui.saveUserSettings();
          }
        },
        loadTopUsers: function () {
          var topUsersElement = $('.box-content[data-id="top-users"]');
          ui.triggerLoader(true);
          var timestamp = nowSeconds();
          api.xhr.req(
            'GET',
            '/top-users.json?t' + timestamp,
            {},
            true,
            /**
             * HTTP completion callback for /top-users.json?t. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: html.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                var count = 1,
                  html = '',
                  text = 'stripped-2';
                for (var key in response.tops.followers) {
                  var followerEntry = response.tops.followers[key];
                  text === 'stripped-2' ? (text = 'stripped') : (text = 'stripped-2');
                  var username = followerEntry.username,
                    gETText = '',
                    latestEffectExpiration = Math.max(
                      parseInt(followerEntry.rainbowTime),
                      parseInt(followerEntry.xmasTime),
                      parseInt(followerEntry.halloweenTime)
                    );
                  if (
                    latestEffectExpiration === parseInt(followerEntry.rainbowTime) &&
                    parseInt(followerEntry.rainbowTime) > nowSeconds()
                  )
                    gETText = ' rainbowText';
                  else if (
                    latestEffectExpiration === parseInt(followerEntry.xmasTime) &&
                    parseInt(followerEntry.xmasTime) > nowSeconds()
                  ) {
                    gETText = ' xmasText';
                    username = holidayTextHtml(username);
                  } else
                    latestEffectExpiration === parseInt(followerEntry.halloweenTime) &&
                      parseInt(followerEntry.halloweenTime) > nowSeconds() &&
                      (gETText = ' halloween');
                  var trClassText = '',
                    tdText = '';
                  html +=
                    '<tr class="' +
                    text +
                    '"><td>' +
                    count +
                    '</td><td>' +
                    tdText +
                    trClassText +
                    '<a href="#" class="user open-profile' +
                    gETText +
                    '"  data-profile="' +
                    followerEntry.username.toLowerCase() +
                    '" title="View profile">' +
                    username +
                    '</a></td><td>' +
                    followerEntry.followers +
                    '</td></tr>';
                  count++;
                }
                topUsersElement.find('.top table[data-id="followers"]').html(html);
                var count = 1,
                  giftElementHtml = '',
                  text = 'stripped-2';
                for (var key in response.tops.gifts) {
                  var followerEntry = response.tops.gifts[key];
                  if (text === 'stripped-2') {
                    text = 'stripped';
                  } else text = 'stripped-2';
                  var gETText = '',
                    username = followerEntry.username,
                    latestEffectExpiration = Math.max(
                      parseInt(followerEntry.rainbowTime),
                      parseInt(followerEntry.xmasTime),
                      parseInt(followerEntry.halloweenTime)
                    );
                  if (
                    latestEffectExpiration === parseInt(followerEntry.rainbowTime) &&
                    parseInt(followerEntry.rainbowTime) > nowSeconds()
                  ) {
                    gETText = ' rainbowText';
                  } else if (
                    latestEffectExpiration === parseInt(followerEntry.xmasTime) &&
                    parseInt(followerEntry.xmasTime) > nowSeconds()
                  ) {
                    gETText = ' xmasText';
                    username = holidayTextHtml(username);
                  } else
                    latestEffectExpiration === parseInt(followerEntry.halloweenTime) &&
                      parseInt(followerEntry.halloweenTime) > nowSeconds() &&
                      (gETText = ' halloween');
                  var trClassText = '',
                    tdText = '';
                  count <= 3 &&
                    (tdText += '<img src="/img/badges/gifter.png" alt="TOP 3 GIFTER" title="TOP 3 GIFTER">');
                  giftElementHtml +=
                    '<tr class="' +
                    text +
                    '"><td>' +
                    count +
                    '</td><td>' +
                    tdText +
                    trClassText +
                    '<a href="#" class="user open-profile' +
                    gETText +
                    '"  data-profile="' +
                    followerEntry.username.toLowerCase() +
                    '" title="View profile">' +
                    username +
                    '</a></td><td>' +
                    followerEntry.ratio +
                    '</td></tr>';
                  count++;
                }
                topUsersElement.find('.top table[data-id="gift"]').html(giftElementHtml);
                var count = 1,
                  joinedElementHtml = '',
                  text = 'stripped-2';
                for (var key in response.tops.joined) {
                  var followerEntry = response.tops.joined[key];
                  text === 'stripped-2' ? (text = 'stripped') : (text = 'stripped-2');
                  var gETText = '',
                    username = followerEntry.username,
                    latestEffectExpiration = Math.max(
                      parseInt(followerEntry.rainbowTime),
                      parseInt(followerEntry.xmasTime),
                      parseInt(followerEntry.halloweenTime)
                    );
                  if (
                    latestEffectExpiration === parseInt(followerEntry.rainbowTime) &&
                    parseInt(followerEntry.rainbowTime) > nowSeconds()
                  ) {
                    gETText = ' rainbowText';
                  } else if (
                    latestEffectExpiration === parseInt(followerEntry.xmasTime) &&
                    parseInt(followerEntry.xmasTime) > nowSeconds()
                  ) {
                    gETText = ' xmasText';
                    username = holidayTextHtml(username);
                  } else if (
                    latestEffectExpiration === parseInt(followerEntry.halloweenTime) &&
                    parseInt(followerEntry.halloweenTime) > nowSeconds()
                  ) {
                    gETText = ' halloween';
                  }
                  var trClassText = '',
                    tdText = '',
                    parts = followerEntry.createdAt.split(' ');
                  joinedElementHtml +=
                    '<tr class="' +
                    text +
                    '"><td>' +
                    count +
                    '</td><td>' +
                    tdText +
                    trClassText +
                    '<a href="#" class="user open-profile' +
                    gETText +
                    '"  data-profile="' +
                    followerEntry.username.toLowerCase() +
                    '" title="View profile">' +
                    username +
                    '</a></td><td>' +
                    parts[0] +
                    '</td></tr>';
                  count++;
                }
                topUsersElement.find('.top table[data-id="joined"]').html(joinedElementHtml);
                var count = 1,
                  joinedElementHtml = '',
                  text = 'stripped-2';
                for (var key in response.tops.war) {
                  var followerEntry = response.tops.war[key];
                  text === 'stripped-2' ? (text = 'stripped') : (text = 'stripped-2');
                  var gETText = '',
                    username = followerEntry.username,
                    latestEffectExpiration = Math.max(
                      parseInt(followerEntry.rainbowTime),
                      parseInt(followerEntry.xmasTime),
                      parseInt(followerEntry.halloweenTime)
                    );
                  if (
                    latestEffectExpiration === parseInt(followerEntry.rainbowTime) &&
                    parseInt(followerEntry.rainbowTime) > nowSeconds()
                  )
                    gETText = ' rainbowText';
                  else if (
                    latestEffectExpiration === parseInt(followerEntry.xmasTime) &&
                    parseInt(followerEntry.xmasTime) > nowSeconds()
                  ) {
                    gETText = ' xmasText';
                    username = holidayTextHtml(username);
                  } else
                    latestEffectExpiration === parseInt(followerEntry.halloweenTime) &&
                      parseInt(followerEntry.halloweenTime) > nowSeconds() &&
                      (gETText = ' halloween');
                  var trClassText = '',
                    tdText = '';
                  joinedElementHtml +=
                    '<tr class="' +
                    text +
                    '"><td>' +
                    count +
                    '</td><td>' +
                    tdText +
                    trClassText +
                    '<a href="#" class="user open-profile' +
                    gETText +
                    '"  data-profile="' +
                    followerEntry.username.toLowerCase() +
                    '" title="View profile">' +
                    username +
                    '</a></td><td>' +
                    parseInt(followerEntry.battlePoints).toLocaleString('ru-RU') +
                    '</td></tr>';
                  count++;
                }
                topUsersElement.find('.top table[data-id="war"]').html(joinedElementHtml);
                var count = 1,
                  pixelsElementHtml = '',
                  text = 'stripped-2';
                for (var key in response.tops.pixels) {
                  var followerEntry = response.tops.pixels[key];
                  if (text === 'stripped-2') {
                    text = 'stripped';
                  } else {
                    text = 'stripped-2';
                  }
                  var gETText = '',
                    username = followerEntry.username,
                    latestEffectExpiration = Math.max(
                      parseInt(followerEntry.rainbowTime),
                      parseInt(followerEntry.xmasTime),
                      parseInt(followerEntry.halloweenTime)
                    );
                  if (
                    latestEffectExpiration === parseInt(followerEntry.rainbowTime) &&
                    parseInt(followerEntry.rainbowTime) > nowSeconds()
                  )
                    gETText = ' rainbowText';
                  else if (
                    latestEffectExpiration === parseInt(followerEntry.xmasTime) &&
                    parseInt(followerEntry.xmasTime) > nowSeconds()
                  ) {
                    gETText = ' xmasText';
                    username = holidayTextHtml(username);
                  } else
                    latestEffectExpiration === parseInt(followerEntry.halloweenTime) &&
                      parseInt(followerEntry.halloweenTime) > nowSeconds() &&
                      (gETText = ' halloween');
                  var trClassText = '',
                    tdText = '';
                  pixelsElementHtml +=
                    '<tr class="' +
                    text +
                    '"><td>' +
                    count +
                    '</td><td>' +
                    tdText +
                    trClassText +
                    '<a href="#" class="user open-profile' +
                    gETText +
                    '"  data-profile="' +
                    followerEntry.username.toLowerCase() +
                    '" title="View profile">' +
                    username +
                    '</a></td><td>' +
                    parseInt(followerEntry.pixels).toLocaleString('ru-RU') +
                    '</td></tr>';
                  count++;
                }
                topUsersElement.find('.top table[data-id="pixels"]').html(pixelsElementHtml);
                ui.triggerLoader(false);
              } else {
                ui.triggerLoader(false);
                showNotification('error', 'Error', response.message);
              }
            }
          );
        },
        loadGuildData: function () {
          ui.triggerLoader(true);
          var timestamp = nowSeconds();
          api.xhr.req(
            'GET',
            '/top-guilds.json?t' + timestamp,
            {},
            true,
            /**
             * HTTP completion callback for /top-guilds.json?t. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Shared/receiver state written: ui.guildListCache, ui.lastStartGuildFetch, ui.guildListI.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                ui.guildListCache = response;
                ui.lastStartGuildFetch = 0;
                ui.loadGuilds(0);
                ui.guildListI = 1;
              } else {
                ui.triggerLoader(false);
                showNotification('error', 'Error', response.message);
              }
            }
          );
        },
        /**
         * Shared/receiver state written: ui.lastStartGuildFetch, ui.guildListI.
         *
         * Observed DOM operations: rowsElement.html, rowsElement.append, html, text, loadMoreElement.show, loadMoreElement.text, loadMoreElement.attr, loadMoreElement.removeClass (plus 1 other observed operations).
         *
         * Input bindings: lastStartGuildFetch. Names describe inferred roles; protocol field names are preserved separately.
         */
        loadGuilds: function (lastStartGuildFetch) {
          if (ui.guildListCache === null) ui.loadGuildData();
          else {
            var rowsElement = ui.activeContent.find('.rows');
            if (lastStartGuildFetch === 0) {
              rowsElement.html('');
              ui.lastStartGuildFetch = 0;
              ui.triggerLoader(false);
              ui.guildListI = 1;
            } else {
              ui.lastStartGuildFetch = lastStartGuildFetch;
            }
            var loadMoreElement = ui.activeContent.find('.load-more'),
              guildListCache = ui.guildListCache,
              guildListLimit = lastStartGuildFetch + ui.guildListLimit,
              count = 1;
            for (var key in guildListCache.guilds) {
              if (key > guildListLimit) {
                break;
              } else if (key >= lastStartGuildFetch) {
                var guildEntry = guildListCache.guilds[key];
                if (
                  ui.guildListSearch != '' &&
                  guildEntry.tag.toLowerCase().indexOf(ui.guildListSearch) === -1 &&
                  guildEntry.name.toLowerCase().indexOf(ui.guildListSearch) === -1 &&
                  guildEntry.name.toLowerCase().indexOf(ui.description) === -1
                ) {
                } else {
                  var text = 'APPLY',
                    unusedRankColor = '#ff9d50';
                  parseInt(guildEntry.auto_accept) === 1 && ((text = 'JOIN'), (unusedRankColor = '#00b2e1'));
                  var guildRankDetailsHtml = '';
                  if (parseInt(guildEntry.canvas) > 0) {
                    guildRankDetailsHtml =
                      '<img src="/canvas/' + guildEntry.canvas + '.png?t=' + nowSeconds() + '">';
                  }
                  var element = $(
                    '<a href="#" class="open-guild" data-tag="' +
                      guildEntry.tag +
                      '">' +
                      '<div>' +
                      '    <h1>#' +
                      guildEntry.position +
                      '</h1>' +
                      '    <p><img src="/img/icons/i-team-black.svg" width="16"><br/>' +
                      guildEntry.members_count +
                      '</p>' +
                      '</div>' +
                      '<div class="guild-info">' +
                      '    <h1><span class="tag"></span> &bull; <span class="name"></span> <span class="points"></span></h1>' +
                      '    <p></p>' +
                      '</div>' +
                      '<div class="emblem">' +
                      guildRankDetailsHtml +
                      '</div>' +
                      '</a>'
                  );
                  rowsElement.append(element);
                  element.find('.guild-info .tag').html('' + guildEntry.tag + '');
                  element.find('.guild-info .name').text(guildEntry.name);
                  element
                    .find('.guild-info .points')
                    .text(
                      parseInt(guildEntry.points).toLocaleString('ru-RU') +
                        ' points (' +
                        parseInt(guildEntry.battlePoints).toLocaleString('ru-RU') +
                        ' battle points)'
                    );
                  element.find('.guild-info p').text(guildEntry.description);
                  if (count === 5) {
                    var rankingAdsEnabled = 0;
                    rankingAdsEnabled &&
                      (!serverData.user.connected ||
                        (serverData.user.connected &&
                          (parseInt(serverData.user.premium.expire_at) < nowSeconds() ||
                            !serverData.user.premium.active))) &&
                      rowsElement.append(
                        '<div><script type="text/javascript" src="//services.vlitag.com/adv1/?q=27546936fdc4110d04b58b19cd9d49f5" defer="" async=""></script><script> var vitag = vitag || {};</script></div><div class="absm"><div class="title">Advertising</div><div class="adsbyvli" style="width:320px; height:50px" data-ad-slot="vi_23510102705"></div> <script>(vitag.Init = window.vitag.Init || []).push(function () { viAPItag.display("vi_23510102705") })</script></div>'
                      );
                  }
                  count++;
                  count > 5 && (count = 1);
                  ui.guildListI++;
                }
              }
            }
            guildListCache.total > ui.lastStartGuildFetch + 1
              ? (loadMoreElement.show(),
                loadMoreElement.text(loadMoreElement.attr('data-text')),
                loadMoreElement.removeAttr('disabled'),
                loadMoreElement.removeClass('spin'))
              : (loadMoreElement.hide(),
                rowsElement.append(
                  '<div class="text-center">Can\'t find your guild? The TOP 100 Guild list is updated every 10 minutes<br/>Click on your profile and click your guild tag to find yours</div>'
                ));
            guildListCache.total === 0 && rowsElement.html('<p class="margin-top"><b>No guilds :(.</b></p>');
          }
        }
      };
      $(document).on(
        'change',
        '.check [name="TM-display-live-tracking"]',
        /**
         * Registered change callback delegated to ".check [name=\"TM-display-live-tracking\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: renderTracking, canvasRenderer.liveTrackingUsers.
         *
         * Observed DOM operations: remove.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          this.checked
            ? (renderTracking = true)
            : ((renderTracking = false),
              canvasRenderer.element.move.find('.track').remove(),
              (canvasRenderer.liveTrackingUsers = {}));
        }
      );
      $(document).on(
        'click',
        '.perms [name="modPermBan"], .perms [name="modPermTools"]',
        /**
         * Registered click callback delegated to ".perms [name=\"modPermBan\"], .perms [name=\"modPermTools\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-painting-access.php.
         *
         * Observed DOM operations: attr, element.attr, element.addClass, element.text, element.html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var element = $(this),
            permData = {};
          permData.perm = $(this).attr('name') === 'modPermBan' ? 'ban' : 'tools';
          permData.username = element.attr('data-username');
          permData.painting = serverData.painting.id;
          var requestData = permData;
          element.addClass('spin');
          element.attr('data-text', element.text());
          element.html('<img src="/img/icons/spin.svg" width="14">');
          element.attr('disabled', 'true');
          api.xhr.req(
            'POST',
            '/api/get-painting-access.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: element.text, element.attr, element.removeClass.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              success
                ? (ui.triggerLoader(false),
                  element.text(element.attr('data-text')),
                  element.removeAttr('disabled'),
                  element.removeClass('spin'),
                  canvasRenderer.fetchPaintingModerators(),
                  showNotification('success', 'Permissions updated'))
                : (ui.triggerLoader(false),
                  element.text(element.attr('data-text')),
                  element.removeAttr('disabled'),
                  element.removeClass('spin'),
                  showNotification('error', 'Error', response.message));
            }
          );
        }
      );
      $(document).on(
        'click',
        '.guild-new-apply',
        /**
         * Registered click callback delegated to ".guild-new-apply". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-guild-access.php.
         *
         * Observed DOM operations: element.attr, element.addClass, element.text, element.html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var element = $(this),
            premiumCodeRequest = {};
          premiumCodeRequest.id = element.attr('data-tag');
          premiumCodeRequest.apply = true;
          var requestData = premiumCodeRequest;
          element.addClass('spin');
          element.attr('data-text', element.text());
          element.html('<img src="/img/icons/spin.svg" width="14">');
          element.attr('disabled', 'true');
          api.xhr.req(
            'POST',
            '/api/post-guild-access.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/post-guild-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Direct network calls: POST /api/post-guild-access.php.
             *
             * Observed DOM operations: element.attr, element.text, element.removeClass.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                if (parseInt(response.auto_accept) === 1) {
                  var guildJoinRequest = {};
                  guildJoinRequest.username = serverData.user.name;
                  guildJoinRequest.guildTag = element.attr('data-tag');
                  guildJoinRequest.add = true;
                  var requestData = guildJoinRequest;
                  api.xhr.req(
                    'POST',
                    '/api/post-guild-access.php',
                    requestData,
                    true,
                    /**
                     * HTTP completion callback for /api/post-guild-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                     *
                     * Observed DOM operations: element.text, element.attr, element.removeClass.
                     *
                     * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                     */
                    function (success, response) {
                      ui.triggerLoader(false);
                      element.text(element.attr('data-text'));
                      element.removeAttr('disabled');
                      element.removeClass('spin');
                      if (success) {
                      } else showNotification('error', 'Error', response.message);
                    }
                  );
                } else {
                  ui.triggerLoader(false);
                  element.text(element.attr('data-text'));
                  element.removeAttr('disabled');
                  element.removeClass('spin');
                  showNotification(
                    'success',
                    'Request sent',
                    'Please wait until the guild leader review your application'
                  );
                }
              } else {
                ui.triggerLoader(false);
                element.text(element.attr('data-text'));
                element.removeAttr('disabled');
                element.removeClass('spin');
                showNotification('error', 'Error', response.message);
              }
            }
          );
        }
      );
      $(document).on(
        'click',
        '.go-to-coords',
        /**
         * Registered click callback delegated to ".go-to-coords". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var scale = canvasRenderer.scale;
          $(this).attr('data-s').length > 0 && (scale = parseFloat($(this).attr('data-s')));
          var x = parseInt($(this).attr('data-x')),
            y = parseInt($(this).attr('data-y'));
          !isNaN(scale) && !isNaN(x) && !isNaN(y) && canvasRenderer.centerPositionTo(scale, x, y);
        }
      );
      $(document).on(
        'click',
        '.guild-quit',
        /**
         * Registered click callback delegated to ".guild-quit". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-guild-access.php.
         *
         * Observed DOM operations: element.addClass, element.attr, element.text, element.html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var element = $(this),
            guildLeaveRequest = {};
          guildLeaveRequest.leave = true;
          var requestData = guildLeaveRequest;
          element.addClass('spin');
          element.attr('data-text', element.text());
          element.html('<img src="/img/icons/spin.svg" width="14">');
          element.attr('disabled', 'true');
          api.xhr.req(
            'POST',
            '/api/post-guild-access.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/post-guild-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: element.text, element.attr, element.removeClass, hide.
             *
             * Scheduled work: setTimeout (4000 ms).
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              ui.triggerLoader(false);
              element.text(element.attr('data-text'));
              element.removeAttr('disabled');
              element.removeClass('spin');
              success
                ? (showNotification('success', 'Success!', 'You left the guild'),
                  $('.guild-quit').hide(),
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000))
                : showNotification('error', 'Error', response.message);
            }
          );
        }
      );
      $('#chat .tabs a[data-id="guild"]').on('click', function (event) {
        event.preventDefault();
        serverData.user.guild === '' && ui.openModal('main', 'guilds');
      });
      $('.box-content').on(
        'scroll',
        /**
         * Registered scroll callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: ui.moreContentBelow.hide, ui.moreContentBelow.show.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var element = $(this);
          if (element[0].scrollHeight - element.scrollTop() <= parseInt(element.outerHeight()) + 80)
            ui.moreContentBelow.hide();
          else {
            ui.moreContentBelow.show();
          }
        }
      );
      ui.moreContentBelow.on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: ui.activeContent[computed].scrollTop.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          ui.activeContent[0].scrollTop += 100;
        }
      );
      $(document).on(
        'click',
        '.open-modal',
        /**
         * Registered click callback delegated to ".open-modal". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if ($(event.target).attr('id') !== undefined && $(event.target).attr('id') === 'dismiss-news')
            return;
          else {
            var target = $(this).attr('data-target'),
              content = $(this).attr('data-content'),
              extra = $(this).attr('data-extra');
            ui.openModal(target, content, extra);
          }
        }
      );
      ui.elem.container.find('.box-menu li a').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var content = $(this).attr('data-content');
          content && (event.preventDefault(), ui.updateActiveContent(ui.selectors.modal, content));
        }
      );
      ui.elem.container.find('.box-sub-menu li a').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var content = $(this).attr('data-content'),
            extra = $(this).attr('data-extra');
          content && (event.preventDefault(), ui.updateActiveContent(ui.selectors.modal, content, extra));
        }
      );
      ui.elem.container.find('.close-modal').on('click', function (event) {
        event.preventDefault();
        ui.closeModal();
      });
      ui.elem.container.on(
        'pointerdown',
        /**
         * Registered pointerdown callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (ui.activeElement && $(event.target).attr('id') === 'modals') {
            if (!ui.activeCaptcha && !ui.activeAlert) {
              if (!ui.activeElement.hasClass('sticky')) {
                ui.closeModal();
              }
            }
          }
        }
      );
      $(document).on('input', 'input[name="filter-request"][data-type="0"]', function () {
        canvasRenderer.fetchPaintingAccess(0, 0);
      });
      $(document).on('input', 'input[name="filter-request"][data-type="1"]', function () {
        canvasRenderer.fetchPaintingAccess(1, 0);
      });
      $(document).on('input', 'input[name="filter-request"][data-type="2"]', function () {
        canvasRenderer.fetchPaintingAccess(2, 0);
      });
      $(document).on(
        'input',
        'input[name="filter-guilds"]',
        /**
         * Registered input callback delegated to "input[name=\"filter-guilds\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: ui.guildListSearch.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         */
        function () {
          ui.guildListSearch = $(this).val().toLowerCase();
          ui.triggerLoader(false);
          ui.loadGuilds(0);
        }
      );
      $(document).on(
        'input',
        'input[name="filter-paintings"]',
        /**
         * Registered input callback delegated to "input[name=\"filter-paintings\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: canvasRenderer.paintingListStart, canvasRenderer.paintingListSearch.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         */
        function () {
          canvasRenderer.paintingListStart = 0;
          var paintingListSearch = $(this).val();
          paintingListSearch && paintingListSearch !== ''
            ? (paintingListSearch = paintingListSearch.toLowerCase())
            : (paintingListSearch = '');
          canvasRenderer.paintingListSearch = paintingListSearch;
          canvasRenderer.refreshPaintingList(0);
        }
      );
      ui.elem.container.find('#form-tools a, .other-tools').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var name = $(this).attr('data-name');
          ui.onChangeTools(name);
        }
      );
      ui.elem.container.find('.input-checkbox[data-name="protection"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (ui.selectors.extra !== 'create')
            showNotification('error', 'This setting can only be set on painting creation');
          else if (serverData.user.premium.active) {
            var inputValue = parseInt(
              ui.elem.container
                .find('.input-checkbox[data-name="protection"]')
                .parent()
                .find('input[name="protection"]')
                .val()
            );
            inputValue
              ? (ui.elem.container.find('.input-checkbox[data-name="protection"]').removeClass('selected'),
                ui.elem.container
                  .find('.input-checkbox[data-name="protection"]')
                  .parent()
                  .find('input[name="protection"]')
                  .val(0))
              : (ui.elem.container.find('.input-checkbox[data-name="protection"]').removeClass('selected'),
                ui.elem.container.find('.input-checkbox[data-name="protection"]').addClass('selected'),
                ui.elem.container
                  .find('.input-checkbox[data-name="protection"]')
                  .parent()
                  .find('input[name="protection"]')
                  .val(1));
          } else showNotification('error', 'You need to be a Premium Subscriber to modify this setting');
        }
      );
      ui.elem.container.find('.input-checkbox[data-name="shop-items"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var inputValue = parseInt(
            ui.elem.container
              .find('.input-checkbox[data-name="shop-items"]')
              .parent()
              .find('input[name="shop-items"]')
              .val()
          );
          if (inputValue) {
            ui.elem.container.find('.input-checkbox[data-name="shop-items"]').removeClass('selected');
            ui.elem.container
              .find('.input-checkbox[data-name="shop-items"]')
              .parent()
              .find('input[name="shop-items"]')
              .val(0);
          } else {
            ui.elem.container.find('.input-checkbox[data-name="shop-items"]').removeClass('selected');
            ui.elem.container.find('.input-checkbox[data-name="shop-items"]').addClass('selected');
            ui.elem.container
              .find('.input-checkbox[data-name="shop-items"]')
              .parent()
              .find('input[name="shop-items"]')
              .val(1);
          }
        }
      );
      ui.elem.container.find('.input-checkbox[data-name="nsfw"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var inputValue = parseInt(
            ui.elem.container
              .find('.input-checkbox[data-name="nsfw"]')
              .parent()
              .find('input[name="nsfw"]')
              .val()
          );
          if (inputValue) {
            ui.elem.container.find('.input-checkbox[data-name="nsfw"]').removeClass('selected');
            ui.elem.container
              .find('.input-checkbox[data-name="nsfw"]')
              .parent()
              .find('input[name="nsfw"]')
              .val(0);
          } else {
            ui.elem.container.find('.input-checkbox[data-name="nsfw"]').removeClass('selected');
            ui.elem.container.find('.input-checkbox[data-name="nsfw"]').addClass('selected');
            ui.elem.container
              .find('.input-checkbox[data-name="nsfw"]')
              .parent()
              .find('input[name="nsfw"]')
              .val(1);
          }
        }
      );
      ui.elem.container.find('.input-checkbox[data-name="discord-required"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var inputValue = parseInt(
            ui.elem.container
              .find('.input-checkbox[data-name="discord-required"]')
              .parent()
              .find('input[name="discord-required"]')
              .val()
          );
          if (serverData.user.premium.active) {
            if (inputValue) {
              ui.elem.container.find('.input-checkbox[data-name="discord-required"]').removeClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="discord-required"]')
                .parent()
                .find('input[name="discord-required"]')
                .val(0);
            } else {
              ui.elem.container.find('.input-checkbox[data-name="discord-required"]').removeClass('selected');
              ui.elem.container.find('.input-checkbox[data-name="discord-required"]').addClass('selected');
              ui.elem.container
                .find('.input-checkbox[data-name="discord-required"]')
                .parent()
                .find('input[name="discord-required"]')
                .val(1);
            }
          } else {
            ui.elem.container.find('.input-checkbox[data-name="discord-required"]').removeClass('selected');
            ui.elem.container
              .find('.input-checkbox[data-name="discord-required"]')
              .parent()
              .find('input[name="discord-required"]')
              .val(0);
            showNotification('error', 'You need to be a Premium Subscriber to modify this setting');
          }
        }
      );
      ui.elem.container.find('.input-checkbox[data-name="auto-accept"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var inputValue = parseInt(
            ui.elem.container
              .find('.input-checkbox[data-name="auto-accept"]')
              .parent()
              .find('input[name="auto-accept"]')
              .val()
          );
          inputValue
            ? (ui.elem.container.find('.input-checkbox[data-name="auto-accept"]').removeClass('selected'),
              ui.elem.container
                .find('.input-checkbox[data-name="auto-accept"]')
                .parent()
                .find('input[name="auto-accept"]')
                .val(0))
            : (ui.elem.container.find('.input-checkbox[data-name="auto-accept"]').removeClass('selected'),
              ui.elem.container.find('.input-checkbox[data-name="auto-accept"]').addClass('selected'),
              ui.elem.container
                .find('.input-checkbox[data-name="auto-accept"]')
                .parent()
                .find('input[name="auto-accept"]')
                .val(1));
        }
      );
      ui.elem.container.find('input[type="range"][name="brush"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val, text.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var inputValue = parseInt(ui.elem.container.find('input[type="range"][name="brush"]').val());
          ui.elem.container.find('.brush-size').text(inputValue + ' x ' + inputValue);
        }
      );
      $('#tools')
        .find('input[type="range"][name="tool-brush"]')
        .on(
          'input',
          /**
           * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
           *
           * Shared/receiver state written: canvasRenderer.brush.size.
           *
           * Observed DOM operations: val, text.
           *
           * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (event) {
            event.preventDefault();
            var size = parseInt($('#tools').find('input[type="range"][name="tool-brush"]').val());
            if (canvasRenderer.mode === 0) {
              canvasRenderer.brush.size = serverData.painting.brush.size;
              $('#tools').find('input[type="range"][name="tool-brush"]').val(canvasRenderer.brush.size);
              $('#tools').find('.size-preview').text(canvasRenderer.brush.size);
              showNotification(
                'error',
                "You can't change the brush size in player mode, please use others modes for this",
                ''
              );
            } else if (canvasRenderer.mode === 4 && size > 25 && !serverData.user.isStaff) {
              canvasRenderer.brush.size = 25;
              $('#tools').find('input[type="range"][name="tool-brush"]').val(canvasRenderer.brush.size);
              $('#tools').find('.size-preview').text(canvasRenderer.brush.size);
              showNotification('error', '25px is the max size for this mode', '');
            } else {
              canvasRenderer.brush.size = size;
              $('#tools').find('.size-preview').text(size);
            }
          }
        );
      $('#tools').find('input[type="range"][name="tool-brush"]').val(canvasRenderer.brush.size);
      $('#tools').find('.size-preview').text(canvasRenderer.brush.size);
      $('#tools')
        .find('input[type="checkbox"][name="checkbox-protection-bg"]')
        .on(
          'input',
          /**
           * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
           *
           * Shared/receiver state written: canvasRenderer.protectionWithBG.
           *
           * Observed DOM operations: prop.
           *
           * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (event) {
            if (
              $('#tools').find('input[type="checkbox"][name="checkbox-protection-bg"]').prop('checked') ==
              true
            ) {
              canvasRenderer.protectionWithBG = true;
            } else canvasRenderer.protectionWithBG = false;
          }
        );
      var inputEnabled = false,
        toolsEnabled = false,
        inputTypeRadioNameRadioProtectionToolEnabled = false,
        unusedLegacyFlag = false;
      $('#tools')
        .find('input[type="radio"][name="radio-protection-tool"]')
        .on(
          'input',
          /**
           * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
           *
           * Shared/receiver state written: repeatedPlacementActive, canvasRenderer.mode, canvasRenderer.brush.size, inputEnabled, toolsEnabled, inputTypeRadioNameRadioProtectionToolEnabled.
           *
           * Observed DOM operations: val, text, elements.cursor.css, elements.cursor.text.
           *
           * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (event) {
            event.preventDefault();
            var inputValue = parseInt(
              $('#tools').find('input[type="radio"][name="radio-protection-tool"]:checked').val()
            );
            if (inputValue === 0) {
              repeatedPlacementActive = false;
              canvasRenderer.mode = 0;
              canvasRenderer.brush.size = serverData.painting.brush.size;
              $('#tools').find('input[type="range"][name="tool-brush"]').val(canvasRenderer.brush.size);
              $('#tools').find('.size-preview').text(canvasRenderer.brush.size);
              elements.cursor.css('width', '26px');
              elements.cursor.css('height', '26px');
              elements.cursor.css('padding', '0px');
              elements.cursor.text('');
            } else if (inputValue === 1) {
              repeatedPlacementActive = false;
              canvasRenderer.mode = 1;
              elements.cursor.css('width', 'auto');
              elements.cursor.css('max-width', '200px');
              elements.cursor.css('height', 'auto');
              elements.cursor.css('padding', '10px');
              elements.cursor.text('PROTECTING');
              !inputEnabled &&
                (alert(
                  "This tool allow you to protect pixels. Choose a color (doesn't matter which one) and start to paint over areas you want to protect."
                ),
                alert(
                  "IMPORTANT: Changes are NOT instant, this will take up to 5 min before they are applied by the server. You will get a notification when it's done."
                ),
                (inputEnabled = true));
            } else if (inputValue === 2) {
              repeatedPlacementActive = false;
              canvasRenderer.mode = 2;
              elements.cursor.css('width', 'auto');
              elements.cursor.css('max-width', '200px');
              elements.cursor.css('height', 'auto');
              elements.cursor.css('padding', '10px');
              elements.cursor.text('UN-PROTECTING');
              !toolsEnabled &&
                (alert(
                  "This tool allow you to un-protect pixels. Choose a color (doesn't matter which one) and start to paint over areas you want to un-protect."
                ),
                alert(
                  "IMPORTANT: Changes are NOT instant, this will take up to 5 min before they are applied by the server. You will get a notification when it's done."
                ),
                (toolsEnabled = true));
            } else if (inputValue === 3) {
              repeatedPlacementActive = false;
              canvasRenderer.mode = 3;
              elements.cursor.css('width', 'auto');
              elements.cursor.css('max-width', '200px');
              elements.cursor.css('height', 'auto');
              elements.cursor.css('padding', '10px');
              elements.cursor.text('REPLACING');
              !inputTypeRadioNameRadioProtectionToolEnabled &&
                (alert(
                  'This tool allow you to replace any pixels (protected or not, be careful!) by the selected color.'
                ),
                alert('IMPORTANT: Changes are applied instantly for this tool'),
                (inputTypeRadioNameRadioProtectionToolEnabled = true));
            } else
              inputValue === 4 &&
                ((repeatedPlacementActive = false),
                (canvasRenderer.mode = 4),
                (canvasRenderer.brush.size = serverData.painting.brush.size),
                $('#tools').find('input[type="range"][name="tool-brush"]').val(canvasRenderer.brush.size),
                $('#tools').find('.size-preview').text(canvasRenderer.brush.size),
                elements.cursor.css('width', '26px'),
                elements.cursor.css('height', '26px'),
                elements.cursor.css('padding', '0px'),
                elements.cursor.text(''));
          }
        );
      var activeSocialPanel = false;
      $('a[data-id="painting-owner-tools"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: activeSocialPanel, repeatedPlacementActive, canvasRenderer.mode, canvasRenderer.brush.size.
         *
         * Observed DOM operations: css, show, val, text, elements.cursor.css, elements.cursor.text, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (!activeSocialPanel) {
            activeSocialPanel = true;
            $('#tools').css('top', parseInt($('[data-id="painting-owner-tools"]').offset().top) + 'px');
            $('#tools').show();
          } else {
            activeSocialPanel = false;
            repeatedPlacementActive = false;
            canvasRenderer.mode = 0;
            canvasRenderer.brush.size = serverData.painting.brush.size;
            $('#tools').find('input[type="range"][name="tool-brush"]').val(canvasRenderer.brush.size);
            $('#tools').find('.size-preview').text(canvasRenderer.brush.size);
            elements.cursor.css('width', '26px');
            elements.cursor.css('height', '26px');
            elements.cursor.css('padding', '0px');
            elements.cursor.text('');
            $('#tools').hide();
          }
        }
      );
      var socialPanelState = false;
      /**
       * Shared/receiver state written: socialPanelState.
       *
       * Observed DOM operations: removeClass, addClass, hide, show.
       *
       * Input bindings: panel, forceOpen. Names describe inferred roles; protocol field names are preserved separately.
       */
      function openSocialPanel(panel, forceOpen) {
        if (!socialPanelState || forceOpen) {
          socialPanelState = panel;
          if (!forceOpen && serverData.user.settings.chat.invisible && panel === 'friends') {
            panel = 'guild';
          }
          if (panel === 'friends') {
            if (forceOpen && serverData.user.settings.chat.invisible) {
              showNotification(
                'error',
                'Social features',
                'Please disable Invisible mode in Chat settings to access social features'
              );
              ui.openModal('main', 'tools');
            } else {
              canvasRenderer.loadFriends();
              $('#social').find('.tabs-list a').removeClass('active');
              $('#social')
                .find('.tabs-list a[data-id="' + panel + '"]')
                .addClass('active');
              $('#social').find('button.btn-guild-list').hide();
              $('#social').find('button.btn-guild-requests').hide();
              $('#social').find('button.btn-add-blocked').hide();
              $('#social').find('button.btn-add-friend').show();
              $('#social').show();
            }
          } else if (panel === 'guild') {
            canvasRenderer.loadGuildMembers(true);
            $('#social').find('.tabs-list a').removeClass('active');
            $('#social')
              .find('.tabs-list a[data-id="' + panel + '"]')
              .addClass('active');
            $('#social').find('button.btn-guild-list').hide();
            serverData.user.guild
              ? $('#social').find('button.btn-guild-requests').show()
              : $('#social').find('button.btn-guild-requests').hide();
            $('#social').find('button.btn-add-friend').hide();
            $('#social').find('button.btn-add-blocked').hide();
            $('#social').show();
          } else if (panel === 'guild-requests') {
            canvasRenderer.loadGuildMembersRequests(true);
            $('#social').find('.tabs-list a').removeClass('active');
            $('#social')
              .find('.tabs-list a[data-id="' + panel + '"]')
              .addClass('active');
            $('#social').find('button.btn-guild-list').show();
            $('#social').find('button.btn-guild-requests').hide();
            $('#social').find('button.btn-add-friend').hide();
            $('#social').find('button.btn-add-blocked').hide();
            $('#social').show();
          } else if (panel === 'blocked') {
            canvasRenderer.loadBlocked();
            $('#social').find('.tabs-list a').removeClass('active');
            $('#social')
              .find('.tabs-list a[data-id="' + panel + '"]')
              .addClass('active');
            $('#social').find('button.btn-guild-list').hide();
            $('#social').find('button.btn-guild-requests').hide();
            $('#social').find('button.btn-add-friend').hide();
            $('#social').find('button.btn-add-blocked').show();
            $('#social').show();
          }
        } else closeSocialPanel();
      }
      $('#social .tabs-list a').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          openSocialPanel($(this).attr('data-id'), true);
        }
      );
      /**
       * Shared/receiver state written: socialPanelState.
       *
       * Observed DOM operations: hide.
       */
      function closeSocialPanel() {
        socialPanelState && ((socialPanelState = false), $('#social').hide());
      }
      $('a[data-id="social"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var tab = $(this).attr('data-tab');
          openSocialPanel(tab);
        }
      );
      $('a[data-id="bio-edit"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-bio.php.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var profileBioRequest = {};
          profileBioRequest.bio = '';
          var requestData = profileBioRequest,
            bio = prompt('Enter a bio (max 255 characters)');
          bio !== null &&
            ((requestData.bio = bio),
            api.xhr.req(
              'POST',
              '/api/post-bio.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-bio.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: text, show, hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  response.bio
                    ? ($('#profile .bio span').text(response.bio), $('#profile .bio span').show())
                    : ($('#profile .bio span').text(''), $('#profile .bio span').hide());
                  showNotification('success', 'Success', 'Bio saved!');
                } else showNotification('error', 'Error', response.message);
              }
            ));
        }
      );
      $('.btn-add-friend-data').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-friend.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (serverData.user.settings.chat.invisible) {
            showNotification(
              'error',
              'Social features',
              'Please disable Invisible mode in Chat settings to access social features'
            );
            ui.openModal('main', 'tools');
          } else {
            var profileLookupRequest = {};
            profileLookupRequest.username = $(this).attr('data-username');
            var requestData = profileLookupRequest;
            api.xhr.req(
              'POST',
              '/api/post-friend.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-friend.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                success
                  ? ($('#profile').hide(),
                    canvasRenderer.loadFriends(true),
                    response.changed &&
                      showNotification('success', 'Player followed', 'Player added to your list'))
                  : showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      $('.edit-user-avatar').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-user-avatar.php.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var avatarRequest = {};
          avatarRequest.avatar = true;
          var requestData = avatarRequest;
          api.xhr.req('POST', '/api/post-user-avatar.php', requestData, true, function (success, response) {
            success
              ? window.location.replace('/' + response.id)
              : showNotification('error', 'Error', response.message);
          });
        }
      );
      $('.edit-guild-emblem').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-guild-avatar.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var guildLookupRequest = {};
          guildLookupRequest.tag = $(this).attr('data-tag');
          var requestData = guildLookupRequest;
          api.xhr.req('POST', '/api/post-guild-avatar.php', requestData, true, function (success, response) {
            success
              ? window.location.replace('/' + response.id)
              : showNotification('error', 'Error', response.message);
          });
        }
      );
      $('.buy-coins-btn').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: selectedPriceId.
         *
         * Observed DOM operations: attr, val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var index = $(this).attr('data-index'),
            inputValue = '8JAKBUZ7NHZ2E';
          if (index == 4) {
            selectedPriceId = 4;
            inputValue = '8JAKBUZ7NHZ2E';
          } else if (index == 5) {
            selectedPriceId = 5;
            inputValue = '5HM2P2XGFBGLE';
          } else if (index == 6) {
            selectedPriceId = 6;
            inputValue = 'CSGAAC69LNPJ4';
          } else if (index == 7) {
            selectedPriceId = 7;
            inputValue = 'DFFB52YXCB75N';
          } else if (index == 8) {
            selectedPriceId = 8;
            inputValue = 'C3DSZQXCF95UG';
          }
          $('#paypal input[name="hosted_button_id"]').val(inputValue);
        }
      );
      $(document).on(
        'click',
        '.premium-subscribed, .premium-subscribed-alt',
        /**
         * Registered click callback delegated to ".premium-subscribed, .premium-subscribed-alt". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/manage-premium.php.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if ($(this).hasClass('premium-subscribed-alt')) {
          } else
            api.xhr.req('GET', '/api/manage-premium.php', {}, true, function (success, response) {
              if (success) {
                if (confirm(response.message)) {
                  if (response.url != '') {
                    window.location.replace(response.url);
                  }
                }
              } else showNotification('error', 'Error', response.message);
            });
        }
      );
      $('.plan-block').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: selectedPriceId.
         *
         * Observed DOM operations: attr, val, removeClass, addClass.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var plan = $(this).attr('data-plan'),
            inputValue = 'BVM3SYUCYYNPY';
          if (plan == 1) {
            inputValue = 'UA4Z3S492MDRA';
            selectedPriceId = 1;
          } else if (plan == 2) {
            inputValue = 'BVM3SYUCYYNPY';
            selectedPriceId = 2;
          } else plan == 3 && ((inputValue = 'H4JQFTZ3CTQEJ'), (selectedPriceId = 3));
          $('#paypal input[name="hosted_button_id"]').val(inputValue);
          $('.plan-selected').removeClass('plan-selected');
          $(this).addClass('plan-selected');
        }
      );
      $('.premium-subscribe, .premium-subscribe-alt').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide, show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.prem-box .prem-desc').hide();
          $('.prem-box .prem-checkout').show();
        }
      );
      $('.cancel-premium-subscribe').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: show, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.prem-box .prem-desc').show();
          $('.prem-box .prem-checkout').hide();
        }
      );
      $('.get-more-coins').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Scheduled work: setTimeout (500 ms).
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#item').hide();
          $(this).closest('.s-goldbars').length
            ? (ui.closeModal(), openGoldShop())
            : (ui.closeModal(),
              ui.openModal('main', 'shop'),
              setTimeout(
                /**
                 * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                 *
                 * Shared/receiver state written: ui.activeContent[computed].scrollTop.
                 */
                function () {
                  ui.activeContent[0].scrollTop = ui.activeContent[0].scrollHeight;
                },
                500
              ));
        }
      );
      $(document).on(
        'click',
        '#item .item-lower-quantity, #item .item-add-quantity',
        /**
         * Registered click callback delegated to "#item .item-lower-quantity, #item .item-add-quantity". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, val, text.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var item = parseInt($('#item').attr('data-item')),
            inputValue = parseInt($('#item input[name="quantity"]').val());
          if (!isNaN(inputValue)) {
            if ($(this).hasClass('item-lower-quantity')) inputValue--;
            else {
              inputValue++;
            }
            if (inputValue < 1) {
              inputValue = 1;
            }
            $('#item input[name="quantity"]').val(inputValue);
            $('#item .checkout-item span').text(inputValue * serverData.shop.items[item].price);
          }
        }
      );
      $(document).on(
        'input',
        '#item input[name="quantity"]',
        /**
         * Registered input callback delegated to "#item input[name=\"quantity\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, val, text.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var item = parseInt($('#item').attr('data-item')),
            inputValue = parseInt($('#item input[name="quantity"]').val());
          if (!isNaN(inputValue)) {
            $('#item .checkout-item span').text(inputValue * serverData.shop.items[item].price);
          }
        }
      );
      $(document).on('submit', '#paypal, .paypal-from', function (event) {
        !serverData.user.connected && (event.preventDefault(), ui.openModal('auth', 'login'));
      });
      $(document).on(
        'click',
        '#paypal input[type="submit"], .paypal-from input[type="submit"]',
        function (event) {
          !serverData.user.connected && (event.preventDefault(), ui.openModal('auth', 'login'));
        }
      );
      $(document).on(
        'click',
        '.checkout-item',
        /**
         * Registered click callback delegated to ".checkout-item". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-shop.php.
         *
         * Observed DOM operations: attr, val, hide, show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var itemPurchaseRequest = {};
          itemPurchaseRequest.buy = true;
          itemPurchaseRequest.item = parseInt($('#item').attr('data-item'));
          itemPurchaseRequest.quantity = parseInt($('#item input[name="quantity"]').val());
          var requestData = itemPurchaseRequest;
          confirm(
            'Buy ' + requestData.quantity + ' unit' + (requestData.quantity > 1 ? 's' : '') + ' of this item?'
          ) &&
            ($('#item .box-content-x > div').hide(),
            $('#item .box-content-x > .loading').show(),
            api.xhr.req(
              'POST',
              '/api/post-shop.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-shop.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: serverData.user.ppcoins.
               *
               * Observed DOM operations: show, hide, text.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                $('#item .box-content-x > div').show();
                $('#item .box-content-x > .loading').hide();
                if (success) {
                  serverData.user.ppcoins = parseInt(response.ppcoins);
                  $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                    serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                  );
                  parseInt(requestData.item) === 13 && renderGemBoxLoot(response);
                  canvasRenderer.loadUserItems();
                  showNotification(
                    'success',
                    'Success!',
                    'Item' + (requestData.quantity > 1 ? 's' : '') + ' added to your inventory'
                  );
                } else {
                  $('#item').hide();
                  showNotification('error', 'Error', response.message);
                }
              }
            ));
        }
      );
      $(document).on(
        'click',
        '.how-to-item',
        /**
         * Registered click callback delegated to ".how-to-item". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * Scheduled work: setTimeout (500 ms).
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var item = parseInt($(this).attr('data-item'));
          if (serverData.shop.items[item].type === 1) {
            ui.closeModal();
            setTimeout(function () {
              toggleInventory();
            }, 500);
          } else if (item === 13) openGemBox();
          else if (
            confirm(
              'Would you like to apply [' +
                serverData.shop.items[item].name +
                "] on your account? This action can't be undone and the item will be consumed"
            )
          ) {
            canvasRenderer.useItem(item);
          }
        }
      );
      $(document).on(
        'click',
        '.gift-item',
        /**
         * Registered click callback delegated to ".gift-item". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-shop.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var username = prompt(
            'Please enter the username of the player you wish to gift 1 unit of this item. The player will receive a notification'
          );
          if (username !== null) {
            var giftData = {};
            giftData.gift = true;
            giftData.username = username;
            giftData.item = parseInt($(this).attr('data-item'));
            var requestData = giftData;
            api.xhr.req(
              'POST',
              '/api/post-shop.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-shop.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Scheduled work: setTimeout (1500 ms).
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                success
                  ? (chat.switchChannel('global'),
                    setTimeout(function () {
                      canvasRenderer.loadUserItems();
                    }, 1500),
                    showNotification('success', 'Success!', 'Gift sent <3'))
                  : showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      var inventoryVisible = false;
      $(document).on('click', '.shop-dropdown', function (event) {
        event.preventDefault();
        toggleInventory();
      });
      /**
       * Shared/receiver state written: inventoryVisible, selectedItemId.
       *
       * Observed DOM operations: hide, elements.cursor.css, elements.cursor.text, removeClass, css, show.
       */
      function toggleInventory() {
        canvasRenderer.loadUserItems();
        if (inventoryVisible) {
          inventoryVisible = false;
          $('#items-list').hide();
          selectedItemId = null;
          elements.cursor.css('width', '26px');
          elements.cursor.css('height', '26px');
          elements.cursor.css('padding', '0px');
          elements.cursor.text('');
          $('.select-item-to-use').removeClass('active');
        } else {
          inventoryVisible = true;
          $('#items-list').css('top', parseInt($('.shop-dropdown').offset().top) + 'px');
          $('#items-list').show();
        }
      }
      $(document).on(
        'click',
        '.select-item-to-use',
        /**
         * Registered click callback delegated to ".select-item-to-use". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: selectedItemId, canvasRenderer.brush.size, inventoryVisible.
         *
         * Observed DOM operations: attr, removeClass, elements.cursor.css, elements.cursor.text, show, hide, addClass, elements.cursor.html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var item = parseInt($(this).attr('data-item'));
          if (selectedItemId === item) {
            selectedItemId = null;
            $('.select-item-to-use').removeClass('active');
            elements.cursor.css('width', '26px');
            elements.cursor.css('height', '26px');
            elements.cursor.css('padding', '0px');
            elements.cursor.text('');
            canvasRenderer.brush.size = 1;
          } else {
            if (pointer.touchDevice) $('#mobilebomb').show();
            else {
              !localStorage.getItem('alert-item') &&
                (alert(
                  "You just selected an item. The next LEFT click you do on the painting will use 1 unit of this item. Be carefull we won't be able to refund any miss click. This message won't show again."
                ),
                localStorage.setItem('alert-item', true));
            }
            pointer.touchDevice &&
              ((inventoryVisible = false),
              $('.select-item-to-use').removeClass('active'),
              $('#items-list').hide());
            selectedItemId = item;
            $('.select-item-to-use').removeClass('active');
            $(this).addClass('active');
            elements.cursor.css('width', 'auto');
            elements.cursor.css('max-width', '200px');
            elements.cursor.css('height', 'auto');
            elements.cursor.css('padding', '10px');
            var text = 'png';
            (parseInt(item) === 6 || parseInt(item) === 10 || parseInt(item) === 12) && (text = 'gif');
            elements.cursor.html(
              '<div class="text-center"><img src="/img/item-' +
                item +
                '.' +
                text +
                '?v=4" class="pixelate cursor-item"><br/>' +
                serverData.shop.items[item].name +
                '</div>'
            );
          }
        }
      );
      $(document).on(
        'click',
        '.open-item',
        /**
         * Registered click callback delegated to ".open-item". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/get-item.php.
         *
         * Shared/receiver state written: selectedItemId.
         *
         * Observed DOM operations: attr, html, hide, show, removeClass, elements.cursor.css, elements.cursor.text, text (plus 1 other observed operations).
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var itemId = parseInt($(this).attr('data-item'));
          $('#item').find('.text .stock').html('<b>Stock:</b> <i>Loading...</i>');
          var requestData = {};
          requestData.itemId = itemId;
          api.xhr.req(
            'GET',
            '/api/get-item.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/get-item.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: text, html, hide, show.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                var stock = response.stock;
                if (parseInt(response.stock) >= 999) {
                  stock = '+999';
                }
                if (parseInt(response.updated_price) > 0) {
                  $('#item').find('.checkout-item span').text(response.updated_price);
                }
                if (parseInt(response.stock) <= 0) {
                  $('#item').find('.text .stock').html('<b>Stock:</b> <b class="red">OUT OF STOCK</b>');
                } else
                  $('#item')
                    .find('.text .stock')
                    .html('<b>Stock:</b> <b class="green">' + stock + ' left</b>');
                if (itemId === 13) {
                  $('#item .s-coins').hide();
                  $('#item .s-goldbars').show();
                } else {
                  $('#item .s-coins').show();
                  $('#item .s-goldbars').hide();
                }
              }
            }
          );
          $('#profile').hide();
          $('#guild').hide();
          $('#item .box-x').show();
          if (selectedItemId !== null) {
            selectedItemId = null;
            $('.select-item-to-use').removeClass('active');
            elements.cursor.css('width', '26px');
            elements.cursor.css('height', '26px');
            elements.cursor.css('padding', '0px');
            elements.cursor.text('');
          }
          $('#item').attr('data-item', itemId);
          var text = 'pixelate',
            enabled = true;
          (itemId === 4 || itemId === 5 || itemId === 6 || itemId === 11 || itemId === 10 || itemId === 12) &&
            ((text = ''), (enabled = false));
          itemId === 9 && (enabled = false);
          var inventoryImageExtension = 'png',
            unusedInventoryText = '';
          (parseInt(itemId) === 6 || parseInt(itemId) === 10 || parseInt(itemId) === 12) &&
            ((inventoryImageExtension = 'gif'), (unusedInventoryText = 'bg-white'));
          $('#item')
            .find('.img')
            .html(
              '<img src="/img/item-' +
                itemId +
                '.' +
                inventoryImageExtension +
                '?v=4" alt="icon" class="' +
                text +
                '">'
            );
          $('#item').find('.text h1').text(serverData.shop.items[itemId].name);
          $('#item').find('.text .description').text(serverData.shop.items[itemId].description);
          $('#item')
            .find('.text .size')
            .html(
              '<b>Size:</b> ' +
                serverData.shop.items[itemId].radius +
                'x' +
                serverData.shop.items[itemId].radius +
                ' pixels'
            );
          if (
            itemId === 4 ||
            itemId === 5 ||
            itemId === 6 ||
            itemId === 10 ||
            itemId === 12 ||
            itemId === 11 ||
            itemId === 9 ||
            itemId === 13
          )
            $('#item').find('.text .size').hide();
          else {
            $('#item').find('.text .size').show();
          }
          if (itemId === 13) {
            $('#item .checkout-item').html(
              '<div class="buy">BUY NOW</div> <span>' +
                serverData.shop.items[itemId].price +
                '</span> x <div class="pp-coin-1 gb-r"><img src="/img/gold-bar.png?v=2" width="26"></div>'
            );
            enabled = false;
          } else {
            $('#item .checkout-item').html(
              '<div class="buy">BUY NOW</div> <span>' +
                serverData.shop.items[itemId].price +
                '</span><div class="pp-coin-1"><img src="/img/pp-coin-pause.gif" width="26"></div>'
            );
          }
          $('#item .checkout-item span').text(serverData.shop.items[itemId].price);
          $('#item input[name="quantity"]').val(1);
          enabled ? $('#item .demo').show() : $('#item .demo').hide();
          $('#item .box-content-x > div').show();
          $('#item .box-content-x > .loading').hide();
          $('#item').show();
        }
      );
      $(document).on(
        'click',
        '.followers',
        /**
         * Registered click callback delegated to ".followers". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/get-user-followers.php.
         *
         * Observed DOM operations: show, text, attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.followers-list').text('Loading...').show();
          var giftRecipientRequest = {};
          giftRecipientRequest.username = $(this).attr('data-username');
          var requestData = giftRecipientRequest;
          api.xhr.req(
            'GET',
            '/api/get-user-followers.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/get-user-followers.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: html, append.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                $('.followers-list').html('');
                for (var key in response) {
                  $('.followers-list').append(
                    '<a href="#" class="open-profile" data-profile="' +
                      response[key].username +
                      '">' +
                      response[key].username +
                      '</a> '
                  );
                }
              }
            }
          );
        }
      );
      $(document).on(
        'click',
        '.confirm-craft-painting',
        /**
         * Registered click callback delegated to ".confirm-craft-painting". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/framed-painting.php.
         *
         * Observed DOM operations: attr, hide, show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var artCraftingRequest = {};
          artCraftingRequest.craft = true;
          artCraftingRequest.paintingId = parseInt($('#artist-island .painting-bloc').attr('data-id'));
          artCraftingRequest.frame = parseInt(
            $('#artist-island .paint-settings a.active[data-type="frame"]').attr('data-id')
          );
          artCraftingRequest.gems = parseInt(
            $('#artist-island .paint-settings a.active[data-type="gems"]').attr('data-id')
          );
          artCraftingRequest.special_rainbow = $('input.special_rainbow').is(':checked') ? 1 : 0;
          var requestData = artCraftingRequest;
          $('#artist-island .box-content-x > div').hide();
          $('#artist-island .box-x').show();
          $('#artist-island .box-content-x > .loading').show();
          api.xhr.req(
            'POST',
            '/api/framed-painting.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/framed-painting.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: show, hide.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              $('#artist-island .box-content-x > div').show();
              $('#artist-island .box-content-x > .loading').hide();
              success
                ? (openArtistIsland(), showNotification('success', 'Success', 'Framed Painting created!'))
                : showNotification('error', 'Error', response.message);
            }
          );
        }
      );
      $('#item .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#item').hide();
        }
      );
      $('#item').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if ($(event.target).attr('id') === 'item') {
            event.preventDefault();
            $('#item').hide();
          }
        }
      );
      $('#gembox').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          $(event.target).attr('id') === 'gembox' && (event.preventDefault(), $('#gembox').hide());
        }
      );
      $('#auction').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if ($(event.target).attr('id') === 'auction') {
            event.preventDefault();
            $('#auction').hide();
            if (auctionCountdownInterval) {
              clearInterval(auctionCountdownInterval);
            }
          }
        }
      );
      $('#museum').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if ($(event.target).attr('id') === 'museum') {
            event.preventDefault();
            $('#museum').hide();
          }
        }
      );
      $('#artist-island').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if ($(event.target).attr('id') === 'artist-island') {
            event.preventDefault();
            $('#artist-island').hide();
          }
        }
      );
      $(document).on(
        'click',
        '.open-checkout-method',
        /**
         * Registered click callback delegated to ".open-checkout-method". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#checkout-method .box-x').show();
          $('#checkout-method .box-content-x > div').show();
          $('#checkout-method').show();
        }
      );
      $('#checkout-method .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#checkout-method').hide();
        }
      );
      $('#checkout-method').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          $(event.target).attr('id') === 'checkout-method' &&
            (event.preventDefault(), $('#checkout-method').hide());
        }
      );
      var slotSpinning = false;
      $(document).on(
        'click',
        '#slot .overlay',
        /**
         * Registered click callback delegated to "#slot .overlay". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: slotSpinning.
         *
         * Observed DOM operations: show, addClass, removeClass.
         *
         * Scheduled work: setTimeout (1000 ms), setTimeout (10 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          !slotSpinning &&
            ((slotSpinning = true),
            $('#slot .overlay').removeClass('disabled').addClass('disabled').show(),
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Observed DOM operations: text.
               */
              function () {
                $('#slot .overlay').text('Loading..');
              },
              1000
            ),
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Direct network calls: POST /api/post-dailylootv3.php.
               */
              function () {
                var requestData = {};
                requestData.spin = true;
                api.xhr.req(
                  'POST',
                  '/api/post-dailylootv3.php',
                  requestData,
                  true,
                  /**
                   * HTTP completion callback for /api/post-dailylootv3.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                   *
                   * Shared/receiver state written: slotSpinning.
                   *
                   * Observed DOM operations: hide, css, show, text, removeClass.
                   *
                   * Scheduled work: setTimeout (3500 ms).
                   *
                   * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                   */
                  function (success, response) {
                    if (success) {
                      $('#slot .overlay').hide();
                      $('#slot .overlay-bg').hide();
                      var slotElementLength = parseInt(
                        $('#slot .reel img').length * $('#slot .reel img').width()
                      );
                      $('#slot .reel').css('width', slotElementLength + 'px');
                      var result = response.result + (slotElementLength - $('#slot .reel img').width() * 3),
                        styles = {};
                      styles.left = '-=' + result;
                      var pOSTStyles = {};
                      pOSTStyles.easing = 'easeOutCirc';
                      pOSTStyles.duration = 3500;
                      $('#slot .reel').animate(styles, pOSTStyles, function () {});
                      setTimeout(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Shared/receiver state written: serverData.user.ppcoins, response.label, slotSpinning.
                         *
                         * Observed DOM operations: text.
                         */
                        function () {
                          serverData.user.ppcoins = parseInt(response.ppcoins);
                          $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                            serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                          );
                          if (parseInt(response.snowballs) > 0) {
                            response.label += ' and ' + response.snowballs + ' snowballs';
                          }
                          showNotification('success', 'Daily Loot', response.label);
                          slotSpinning = false;
                        },
                        3500
                      );
                    } else {
                      slotSpinning = false;
                      $('#slot .overlay').removeClass('disabled').text('OPEN').show();
                      $('#slot .overlay-bg').show();
                      showNotification('error', 'Error', response.message);
                    }
                  }
                );
              },
              10
            ));
        }
      );
      $('.odds').on('click', function (event) {
        event.preventDefault();
        alert(
          'Everyday, you have a chance to earn one of the following daily reward:\n3 coins - 26.82%\n5 coins - 25.17%\n10 coins - 22.12%\nMissile - 7.35%\nGold ore (8 to 16) - 6.00%\nBomb - 4.24%\n30 coins - 3.15%\nAtomic bomb - 2.61%\n50 coins - 1.56%\n100 coins - 0.98%'
        );
      });
      function openDailyReward() {
        $('#profile').hide();
        $('#guild').hide();
        $('#item').hide();
        $('#coin-island').hide();
        $('#daily-reward .box-content-x > div').hide();
        $('#daily-reward .box-x').show();
        $('#daily-reward').show();
        $('#daily-reward .box-content-x > div').show();
        $('#daily-reward .box-content-x > .loading').hide();
        serverData.user.event === 1 &&
          ($('#daily-reward .overlay').removeClass('backgroundRainbow').addClass('backgroundRainbow'),
          $('#daily-reward .reel-container').removeClass('borderRainbow').addClass('borderRainbow'),
          $('#daily-reward .line').removeClass('backgroundRainbow').addClass('backgroundRainbow'),
          $('#daily-reward .reel img').attr('src', '/img/lootbox-event-1.png'));
        $('#slot .overlay').removeClass('disabled').text('OPEN').show();
        $('#slot .overlay-bg').show();
      }
      var rewardWheelSpinning = false;
      $('.wheel-container .spin').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: rewardWheelSpinning.
         *
         * Scheduled work: setTimeout (100 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          !rewardWheelSpinning &&
            ((rewardWheelSpinning = true),
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Direct network calls: POST /api/post-dailyreward.php.
               */
              function () {
                var requestData = {};
                requestData.spin = true;
                api.xhr.req(
                  'POST',
                  '/api/post-dailyreward.php',
                  requestData,
                  true,
                  /**
                   * HTTP completion callback for /api/post-dailyreward.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                   *
                   * Shared/receiver state written: rewardWheelSpinning.
                   *
                   * Observed DOM operations: addClass, css, removeClass.
                   *
                   * Scheduled work: setTimeout (5000 ms).
                   *
                   * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                   */
                  function (success, response) {
                    if (success) {
                      $('.wheel-container .inner-wheel').addClass('no-transition');
                      var styles = {};
                      styles.transform = 'rotate(0deg)';
                      $('.wheel-container .inner-wheel').css(styles);
                      $('.wheel-container .spin').addClass('disabled');
                      var result = response.result;
                      $('.wheel-container .inner-wheel').removeClass('no-transition');
                      $('.wheel-container .inner-wheel').removeClass('no-transition');
                      var rotationDegrees = result * 30 + 4320;
                      $('.wheel-container .wheel .sec').each(function () {
                        var styles = {};
                        styles.transform = 'rotate(' + rotationDegrees + 'deg)';
                        $('.wheel-container .inner-wheel').css(styles);
                      });
                      setTimeout(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Shared/receiver state written: serverData.user.ppcoins, rewardWheelSpinning.
                         *
                         * Observed DOM operations: text.
                         */
                        function () {
                          serverData.user.ppcoins = parseInt(response.ppcoins);
                          $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                            serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                          );
                          showNotification('success', 'Daily Spin', response.label);
                          rewardWheelSpinning = false;
                        },
                        5000
                      );
                    } else {
                      rewardWheelSpinning = false;
                      $('.wheel-container .spin').removeClass('disabled');
                      showNotification('error', 'Error', response.message);
                    }
                  }
                );
              },
              100
            ));
        }
      );
      $('#daily-reward .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#daily-reward').hide();
        }
      );
      $('#daily-reward').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          $(event.target).attr('id') === 'daily-reward' &&
            (event.preventDefault(), $('#daily-reward').hide());
        }
      );
      var modalTransitionTimeout = null;
      /**
       * Direct network calls: GET /api/get-coin-island.php.
       *
       * Observed DOM operations: hide, show.
       *
       * Input bindings: island. Names describe inferred roles; protocol field names are preserved separately.
       */
      function openCoinIsland(island) {
        $('#profile').hide();
        $('#guild').hide();
        $('#item').hide();
        $('#coin-island .box-content-x > div').hide();
        $('#coin-island .box-x').show();
        $('#coin-island .box-content-x > .loading').show();
        $('#coin-island').show();
        var requestData = {};
        requestData.island = island;
        api.xhr.req(
          'GET',
          '/api/get-coin-island.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-coin-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: modalTransitionTimeout.
           *
           * Observed DOM operations: attr, html, text, css, addClass, show, removeClass, hide.
           *
           * Scheduled work: setTimeout.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              if (response.currentOwner.isOwner) {
              } else {
              }
              $('#coin-island .head .owner a').attr('data-profile', response.currentOwner.username);
              $('#coin-island .head .owner a').html('' + response.currentOwner.username);
              $('#coin-island .current-coins > span').text(response.currentOwner.coinsToClaim);
              $('#coin-island .current-coins .coins-rate span').text(response.currentOwner.coinsPerHour);
              $('#coin-island .bonus > span').text(
                response.currentOwner.goalsList[response.currentOwner.currentGoalIdReached]
              );
              response.currentOwner.nextGoalId
                ? ($('#coin-island .next-bonus .coins').text(
                    response.currentOwner.goalsList[response.currentOwner.nextGoalId]
                  ),
                  $('#coin-island .next-bonus .next-bonus-time').text(
                    response.currentOwner.nextBonusTimeLeft +
                      ' hour' +
                      (response.currentOwner.nextBonusTimeLeft != 1 ? 's' : '')
                  ),
                  $('#coin-island .next-bonus').css('display', 'block'))
                : $('#coin-island .next-bonus').css('display', 'none');
              $('#submit-attack-coinisland').html(
                'SEND TROOPS & GET OWNERSHIP<div class="coin-line"><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="26"></div> <span class="price">' +
                  response.price +
                  '</span><div class="timeleft"></div></div>'
              );
              $('#submit-attack-coinisland').attr('data-island', island);
              $('#submit-claim-coinisland-coins').attr('data-island', island);
              for (var key in response.currentOwner.goalsList) {
                $('#coin-island .goal-' + key).text(response.currentOwner.goalsList[key]);
              }
              $('#submit-attack-coinisland').attr('data-price', response.price);
              if (island === 0) $('.coinisland-title').text('Welcome to Coin Island!');
              else if (island === 1) $('.coinisland-title').text('Welcome to Tiny Coin Island #1');
              else if (island === 2) $('.coinisland-title').text('Welcome to Tiny Coin Island #2');
              else island === 3 && $('.coinisland-title').text('Welcome to Tiny Coin Island #3');
              parseInt(response.currentOwner.protection) > 0
                ? ($('#submit-attack-coinisland').attr('disabled'),
                  $('#submit-attack-coinisland').addClass('disabled'),
                  $('#submit-attack-coinisland .timeleft')
                    .text(
                      '' +
                        response.currentOwner.protection +
                        ' minute' +
                        (response.currentOwner.protection != 1 ? 's' : '') +
                        ' of island protection left'
                    )
                    .show(),
                  clearTimeout(modalTransitionTimeout),
                  (modalTransitionTimeout = setTimeout(
                    /**
                     * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                     *
                     * Observed DOM operations: css.
                     */
                    function () {
                      $('#coin-island').css('display') !== 'none' && openCoinIsland(0);
                    },
                    response.currentOwner.protection * 60 + '000'
                  )))
                : ($('#submit-attack-coinisland').removeAttr('disabled'),
                  $('#submit-attack-coinisland').removeClass('disabled'),
                  $('#submit-attack-coinisland .timeleft').hide());
              var text = 'class=""',
                html =
                  '<tr><td>Player</td><td>Owned on</td><td>Duration</td><td class="text-right">Price</td><td class="text-right">Claimed</td><td class="text-right">Lost</td></tr>';
              for (var key in response.pastOwners) {
                var gETText = '' + response.pastOwners[key].unclaimed_coins;
                if (parseInt(key) === 0) {
                  text = 'class="stripped-2"';
                  var apiGetCoinIslandPhpText =
                    response.pastOwners[key].duration +
                    ' hour' +
                    (response.pastOwners[key].duration != 1 ? 's' : '');
                  gETText = '';
                } else
                  var apiGetCoinIslandPhpText =
                    response.pastOwners[key].duration +
                    ' hour' +
                    (response.pastOwners[key].duration != 1 ? 's' : '');
                var hourData = {};
                hourData.hour = '2-digit';
                hourData.minute = '2-digit';
                html +=
                  '<tr ' +
                  text +
                  '><td><a href="#" class="open-profile" data-profile="' +
                  response.pastOwners[key].username +
                  '">' +
                  response.pastOwners[key].username +
                  '</a></td><td>' +
                  new Date(parseInt(response.pastOwners[key].started_at) * 1000).toLocaleDateString(
                    [],
                    hourData
                  ) +
                  '</td><td>' +
                  apiGetCoinIslandPhpText +
                  '</td><td class="text-right">' +
                  response.pastOwners[key].price +
                  '</td><td class="text-right">' +
                  response.pastOwners[key].claimed_coins +
                  '</td><td class="text-right">' +
                  gETText +
                  '</td></tr>';
                text === '' ? (text = 'class="stripped"') : (text = '');
              }
              $('#coin-island .past-owners table').html(html);
              $('#coin-island .box-content-x > div').show();
              $('#coin-island .box-content-x > .loading').hide();
            }
          }
        );
      }
      $(document).on(
        'click',
        '.open-coin-island',
        /**
         * Registered click callback delegated to ".open-coin-island". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var count = 0;
          if ($(this).attr('id') === 'coin-island-owner-1') count = 1;
          else if ($(this).attr('id') === 'coin-island-owner-2') count = 2;
          else $(this).attr('id') === 'coin-island-owner-3' && (count = 3);
          openCoinIsland(count);
        }
      );
      $('#coin-island .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#coin-island').hide();
        }
      );
      function updateGoldToolUpgrade(toolLevel) {
        $('#gold-rush .gold-upgrade .gold-items img').attr('src', '/img/gold-tools-' + toolLevel + '.png');
        if (toolUpgradePrices[parseInt(toolLevel) + 1] !== undefined) {
          var pluralSuffix = toolUpgradePrices[parseInt(toolLevel) + 1] === 1 ? '' : 's';
          $('#gold-rush .gold-upgrade .bar-text').text('Upgrade to lvl. ' + (parseInt(toolLevel) + 1));
          $('#gold-rush .upgrade-gold')
            .text(toolUpgradePrices[parseInt(toolLevel) + 1] + ' x Gold Bar' + pluralSuffix)
            .removeClass('disabled');
        } else {
          $('#gold-rush .gold-upgrade .bar-text').text('Mining Tools');
          $('#gold-rush .upgrade-gold')
            .text('Max level reached')
            .removeClass('disabled')
            .addClass('disabled');
        }
      }
      function updateDynamiteUpgrade(dynamiteLevel) {
        $('#gold-rush .gold-upgrade-dynamite .gold-dynamite img').attr(
          'src',
          '/img/gold-bomb-' + dynamiteLevel + '.png?v=1'
        );
        dynamiteUpgradePrices[parseInt(dynamiteLevel) + 1] !== undefined
          ? ($('#gold-rush .gold-upgrade-dynamite .bar-text').text(
              'Upgrade to lvl. ' + (parseInt(dynamiteLevel) + 1)
            ),
            $('#gold-rush .upgrade-gold-dynamite')
              .html(
                dynamiteUpgradePrices[parseInt(dynamiteLevel) + 1] +
                  '<span class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></span>'
              )
              .removeClass('disabled'))
          : ($('#gold-rush .gold-upgrade-dynamite .bar-text').text('Dynamite Power'),
            $('#gold-rush .upgrade-gold-dynamite')
              .text('Max level reached')
              .removeClass('disabled')
              .addClass('disabled'));
      }
      var toolUpgradePrices = {},
        dynamiteUpgradePrices = {},
        auctionFeeRate = 0,
        auctionSellPrice = 0,
        auctionTab = 'all',
        auctionOffset = 0;
      /**
       * Direct network calls: GET /api/get-gold-rush-island.php.
       *
       * Shared/receiver state written: auctionOffset.
       *
       * Observed DOM operations: remove, append, html.
       *
       * Input bindings: loadMore. Names describe inferred roles; protocol field names are preserved separately.
       */
      function loadAuctionRows(loadMore) {
        if (loadMore) auctionOffset += 7;
        else {
          auctionOffset = 0;
        }
        loadMore
          ? ($('.ah_table tbody .ah-load-more').remove(),
            $('.ah_table tbody').append(
              '<tr class="ah-loading"><td colspan="4"><div class="loading-table tiny"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
            ))
          : $('.ah_table tbody').html(
              '<tr class="ah-loading"><td colspan="4"><div class="loading-table tiny"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
            );
        var requestData = {};
        requestData.ah = true;
        requestData.tab = auctionTab;
        requestData.start = auctionOffset;
        api.xhr.req(
          'GET',
          '/api/get-gold-rush-island.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: remove, text, append.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            $('.ah_table tbody .ah-loading').remove();
            if (success) {
              if (auctionTab === 'my') {
                $('.ah_table thead tr td').eq(2).text('Amount received (after AH cut)');
              } else {
                $('.ah_table thead tr td').eq(2).text('Available at this price');
              }
              var html = '',
                text = 'stripped';
              for (var key in response.auctions) {
                var gETHtml =
                  '<a href="#" class="btn ah-buy" data-price="' +
                  response.auctions[key].price +
                  '" data-total="' +
                  (response.auctions[key].total ? response.auctions[key].total : '0') +
                  '">BUY</a>';
                if (auctionTab === 'my') {
                  if (parseInt(response.auctions[key].status) === 2) {
                    text = 'stripped2';
                    gETHtml = '<b>SOLD<b/>';
                    response.auctions[key].total =
                      parseInt(response.auctions[key].price) -
                      parseInt(response.auctions[key].sell_fee) +
                      ' <span class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></span>';
                  } else {
                    gETHtml =
                      '<a href="#" class="btn ah-cancel" data-id="' +
                      response.auctions[key].id +
                      '">CANCEL</a>';
                    response.auctions[key].total = '';
                  }
                }
                html +=
                  '<tr class="' +
                  text +
                  '"><td class="icn"><div class="g-tiny"><img src="/img/gold-bar.png?v=2"></div></td><td class="text-right up">' +
                  response.auctions[key].price +
                  ' <span class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></span></td><td>' +
                  response.auctions[key].total +
                  '</td><td>' +
                  gETHtml +
                  '</td></tr>';
                text === '' ? (text = 'stripped') : (text = '');
              }
              response.more &&
                (html +=
                  '<tr class="ah-load-more"><td colspan="4"><a href="#" class="btn ah-more">Load more</a></td></tr>');
              $('.ah_table tbody').append(html);
            } else showNotification('error', 'Error', response.message);
          }
        );
      }
      $(document).on('click', '.ah-more', function (event) {
        event.preventDefault();
        loadAuctionRows(true);
      });
      $(document).on(
        'click',
        '.ah-all',
        /**
         * Registered click callback delegated to ".ah-all". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: auctionOffset, auctionTab.
         *
         * Observed DOM operations: removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          auctionOffset = 0;
          auctionTab = 'all';
          $('.ah-all, .ah-my').removeClass('active');
          $('.ah-all').addClass('active');
          loadAuctionRows();
        }
      );
      $(document).on(
        'click',
        '.ah-my',
        /**
         * Registered click callback delegated to ".ah-my". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: auctionOffset, auctionTab.
         *
         * Observed DOM operations: removeClass, addClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          auctionOffset = 0;
          auctionTab = 'my';
          $('.ah-all, .ah-my').removeClass('active');
          $('.ah-my').addClass('active');
          loadAuctionRows();
        }
      );
      $(document).on(
        'click',
        '.open-gembox',
        /**
         * Registered click callback delegated to ".open-gembox". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          !$(this).closest('#gembox').length && openGemBox();
        }
      );
      $(document).on(
        'click',
        '.close-gembox',
        /**
         * Registered click callback delegated to ".close-gembox". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#gembox').hide();
        }
      );
      $(document).on(
        'click',
        '.close-auction',
        /**
         * Registered click callback delegated to ".close-auction". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#auction').hide();
          auctionCountdownInterval && clearInterval(auctionCountdownInterval);
        }
      );
      $(document).on(
        'click',
        '.close-museum',
        /**
         * Registered click callback delegated to ".close-museum". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#museum').hide();
        }
      );
      $(document).on(
        'click',
        '.open-pt-create',
        /**
         * Registered click callback delegated to ".open-pt-create". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#artist-island').hide();
          ui.openModal('main', 'painting');
        }
      );
      $(document).on(
        'click',
        '.bid-framed-auction',
        /**
         * Registered click callback delegated to ".bid-framed-auction". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/framed-painting.php.
         *
         * Observed DOM operations: show, hide, auctionElement.show, val, attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var auctionElement = $('#auction');
          auctionElement.find('.box-x').show();
          auctionElement.find('.box-content-x > div').hide();
          auctionElement.find('.box-content-x > .loading').show();
          auctionElement.show();
          var requestData = {};
          requestData.bid = true;
          requestData.price = $(this).closest('form').find('[name="bid-price"]').val();
          requestData.id = $(this).attr('data-framed');
          api.xhr.req(
            'POST',
            '/api/framed-painting.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/framed-painting.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Shared/receiver state written: auctionExpiresAt.
             *
             * Observed DOM operations: show, hide, text, attr, val.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              $('#auction .box-content-x > div').show();
              $('#auction .box-content-x > .loading').hide();
              $('#auction').show();
              if (success) {
                showNotification('success', 'Success', 'You are now the highest bidder');
                var auctionElement = $('#auction');
                auctionElement.find('.a_owner').text(response.ah.current_bid_username);
                auctionElement.find('.a_owner').attr('data-profile', response.ah.current_bid_username);
                auctionElement.find('[name="bid-price"]').val(parseInt(response.ah.current_bid) + 10);
                auctionElement.find('.current_bid').text(response.ah.current_bid);
                auctionElement.find('.bids').text(response.ah.bids);
                auctionExpiresAt = parseInt(response.ah.auction_expire_time);
                loadFramedArtAuctions();
              } else showNotification('error', 'Error', response.message);
            }
          );
        }
      );
      /**
       * Shared/receiver state written: auctionExpiresAt.
       *
       * Observed DOM operations: auctionElement.css, auctionElement.attr, show, hide, text, attr, val.
       *
       * Input bindings: artwork. Names describe inferred roles; protocol field names are preserved separately.
       */
      function openAuction(artwork) {
        var auctionElement = $('#auction');
        if (auctionElement.css('display') !== 'none') {
          if (parseInt(auctionElement.attr('data-auction')) === parseInt(artwork.id)) {
            if (parseInt(artwork.under_auction) === 1) {
              var auctionTimeRemaining =
                parseInt(auctionExpiresAt) - parseInt(nowSeconds() + canvasRenderer.tDelay);
              auctionTimeRemaining <= 0
                ? (auctionElement.find('.result-pending').show(),
                  auctionElement.find('.result-done').hide(),
                  auctionElement.find('.auction-data').hide(),
                  auctionElement.find('form').hide())
                : (auctionElement.find('.result-pending').hide(),
                  auctionElement.find('.result-done').hide(),
                  auctionElement.find('.auction-data').show(),
                  auctionElement.find('form').show(),
                  (!artwork.current_bid_username || !artwork.current_bid_username.length) &&
                    auctionElement.find('.by').hide(),
                  auctionElement.find('.a_owner').text(artwork.current_bid_username),
                  auctionElement.find('.a_owner').attr('data-profile', artwork.current_bid_username),
                  auctionElement.find('[name="bid-price"]').val(parseInt(artwork.current_bid) + 10),
                  auctionElement.find('.current_bid').text(artwork.current_bid),
                  auctionElement.find('.bids').text(artwork.bids),
                  (auctionExpiresAt = parseInt(artwork.auction_expire_time)));
            } else {
              auctionElement.find('.result-pending').hide();
              auctionElement.find('.auction-data').hide();
              auctionElement.find('form').hide();
              if (parseInt(artwork.bids) > 0) {
                auctionElement.find('.result-done').show();
                auctionElement
                  .find('.result-done')
                  .find('.open-profile')
                  .attr('data-profile', artwork.current_bid_username);
                auctionElement.find('.result-done').find('.open-profile').text(artwork.current_bid_username);
                auctionElement.find('.result-done').find('.current_bid').text(artwork.current_bid);
              } else auctionElement.find('.result-done').hide();
            }
          }
        }
      }
      var auctionExpiresAt = 0,
        auctionCountdownInterval = null;
      $(document).on(
        'click',
        '.open-framed-auction',
        /**
         * Registered click callback delegated to ".open-framed-auction". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/framed-painting.php.
         *
         * Observed DOM operations: auctionElement.attr, attr, show, hide, auctionElement.show.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (!$(this).closest('#auction').length) {
            if (!$(this).closest('#auction').length) {
              var auctionElement = $('#auction');
              auctionElement.attr('data-auction', parseInt($(this).attr('data-framed')));
              auctionElement.find('.box-x').show();
              auctionElement.find('.box-content-x > div').hide();
              auctionElement.find('.box-content-x > .loading').show();
              auctionElement.show();
              var requestData = {};
              requestData.auction = true;
              requestData.id = $(this).attr('data-framed');
              api.xhr.req(
                'GET',
                '/api/framed-painting.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/framed-painting.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Shared/receiver state written: auctionExpiresAt, auctionCountdownInterval.
                 *
                 * Observed DOM operations: show, hide, html, text, attr, append, removeClass.
                 *
                 * Scheduled work: setInterval (10 ms).
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  if (success) {
                    $('#auction .box-content-x > div').show();
                    $('#auction .box-content-x > .loading').hide();
                    $('#auction').show();
                    var count = 0;
                    if (parseInt(response.ah.frame_id) === 1) count = 'copper-frame-bg.png';
                    else if (parseInt(response.ah.frame_id) === 2) count = 'iron-frame-bg.png';
                    else if (parseInt(response.ah.frame_id) === 3) count = 'pyrite-frame-bg.png';
                    else if (parseInt(response.ah.frame_id) === 4) {
                      count = 'pixelite-frame-bg.png?v=1';
                    }
                    var auctionThumbnailOffset = 0;
                    if (parseInt(response.ah.gems_id) === 1) auctionThumbnailOffset = 'emerald-frame-bg.png';
                    else if (parseInt(response.ah.gems_id) === 2)
                      auctionThumbnailOffset = 'sapphire-frame-bg.png';
                    else
                      parseInt(response.ah.gems_id) === 3 && (auctionThumbnailOffset = 'ruby-frame-bg.png');
                    var text = '',
                      auctionThumbnailBackground = 'bg-transparent';
                    parseInt(response.ah.bg) > -1 &&
                      ((text = 'background-color:' + appState.painting.palette.colors[response.ah.bg]),
                      (auctionThumbnailBackground = ''));
                    var html = $(
                      '<div class="prow"><div class="lt"><div class="painting-bloc" data-framed="' +
                        response.ah.id +
                        '">' +
                        ' <img src="/canvas/' +
                        response.ah.painting_id +
                        '.png?t=' +
                        (parseInt(response.ah.created_at) + 600) +
                        '" class="pixelate ' +
                        auctionThumbnailBackground +
                        '" style="' +
                        text +
                        '">' +
                        ' <div class="frame"><div class="bg-sp sp-framed-' +
                        response.ah.sp +
                        '"></div><div class="bg-rainbow"></div><img src="/img/' +
                        count +
                        '" class="pixelate">' +
                        '     <div><img src="/img/' +
                        auctionThumbnailOffset +
                        '"></div>' +
                        ' </div>' +
                        ' <a href="#" class="author open-profile" data-profile="" title="Author">' +
                        '     <div class="arrow"></div>' +
                        '     <div class="icns"></div>' +
                        '     <div class="author-name"></div>' +
                        ' </a>' +
                        '</div></div><div class="rt">' +
                        '<h1>Auction - Painting #' +
                        response.ah.id +
                        '</h1>' +
                        '<div class="pt-10 auction-data">' +
                        'Bids: <b class="bids">' +
                        response.ah.bids +
                        '</b><br/>' +
                        'Current bid: <b><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div><span class="current_bid">' +
                        response.ah.current_bid +
                        '</span></b><br/><span class="by">by</span> <b><a href="#" class="open-profile a_owner" data-profile=""></a></b><br/><br/>' +
                        'Time left: <b><span class="t-left"></span></b><br/>' +
                        'Seller: <b><a href="#" class="open-profile a_seller" data-profile=""></a></b>' +
                        '</div>' +
                        '<form class="pt-20"><input type="text" class="input-text" name="bid-price" value="' +
                        (response.ah.current_bid + 10) +
                        '"><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="29"></div>' +
                        '<button class="btn mb-0 bid-framed-auction" data-framed="' +
                        response.ah.id +
                        '">PLACE BID</button></form>' +
                        '<div class="ah-warning result-pending">Auction ended, please wait... <br/>The highest bidder will be displayed shortly.</div>' +
                        '<div class="ah-success result-done"><b><a href="#" class="open-profile a_owner" data-profile="">-</a></b> won this auction for <b><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div><span class="current_bid">-</span></b></div>' +
                        '</div>' +
                        '</div></div><div class="notice">Only the highest bidder will win the painting when the auction ends. Other players will be refunded every time a higher bid is placed. Everytime a higgher bid is placed in the last 2 minutes of an auction, the auction expiration time will be increased by 2 minutes.</div>'
                    );
                    $('#auction .box-content-x > div').html(html);
                    (!response.ah.current_bid_username || !response.ah.current_bid_username.length) &&
                      html.find('.by').hide();
                    if (parseInt(response.ah.frame_id) == 4) {
                      html.find('.bg-rainbow').show();
                    } else html.find('.bg-rainbow').hide();
                    html.find('.a_owner').text(response.ah.current_bid_username);
                    html.find('.a_owner').attr('data-profile', response.ah.current_bid_username);
                    html.find('.a_seller').text(response.ah.owner_username);
                    html.find('.a_seller').attr('data-profile', response.ah.owner_username);
                    html.find('.author-name').text(response.ah.author_username);
                    html.find('.author.open-profile').attr('data-profile', response.ah.author_username);
                    if (response.ah.author_icons) {
                      var parts = response.ah.author_icons.split(',');
                      for (var key in parts) {
                        html
                          .find('.icns')
                          .append('<img src="/img/badges/' + parts[key] + '.png" class="badge" width="16">');
                      }
                    }
                    html.find('.result-pending').hide();
                    html.find('.result-done').hide();
                    html.find('form').show();
                    html.find('.auction-data').show();
                    html.find('.t-left').removeClass('red');
                    auctionExpiresAt = parseInt(response.ah.auction_expire_time);
                    clearInterval(auctionCountdownInterval);
                    var auctionSecondsRemaining =
                      parseInt(auctionExpiresAt) - parseInt(nowSeconds() + canvasRenderer.tDelay);
                    auctionSecondsRemaining > 1 &&
                      (auctionCountdownInterval = setInterval(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Observed DOM operations: text, addClass, removeClass, hide, show.
                         */
                        function () {
                          var auctionSecondsRemaining =
                            parseInt(auctionExpiresAt) - parseInt(nowSeconds() + canvasRenderer.tDelay);
                          html.find('.t-left').text(formatDuration(auctionSecondsRemaining, true));
                          auctionSecondsRemaining <= 60 &&
                            !html.find('.t-left').hasClass('red') &&
                            html.find('.t-left').addClass('red');
                          auctionSecondsRemaining < 0 &&
                            (html.find('.t-left').removeClass('red'),
                            html.find('.t-left').text('Auction ended'),
                            html.find('.auction-data').hide(),
                            html.find('.result-pending').show(),
                            html.find('form').hide(),
                            clearInterval(auctionCountdownInterval));
                        },
                        10
                      ));
                    openAuction(response.ah);
                  } else {
                    $('#auction').hide();
                    showNotification('error', 'Error', response.message);
                  }
                }
              );
            }
          }
        }
      );
      $(document).on(
        'click',
        '#artist-island .choose-paint',
        /**
         * Registered click callback delegated to "#artist-island .choose-paint". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: show, attr, addClass, removeClass, css.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#artist-island .craft-painting').attr('data-id', $(this).attr('data-id')).show();
          $('#artist-island .paint-preview .painting-bloc > img').attr(
            'src',
            '/canvas/' + $(this).attr('data-id') + '.png?t=' + nowSeconds()
          );
          if ($('input.special_rainbow').is(':checked')) {
            $('#artist-island .paint-preview .painting-bloc > img')
              .removeClass('bg-transparent')
              .addClass('bg-transparent');
          } else $('#artist-island .paint-preview .painting-bloc > img').removeClass('bg-transparent');
          $('#artist-island .paint-preview .painting-bloc > img').css(
            'background-color',
            appState.painting.palette.colors[parseInt($(this).attr('data-color'))]
          );
          $('#artist-island .paint-preview .painting-bloc').attr('data-id', $(this).attr('data-id'));
        }
      );
      $(document).on(
        'click',
        '#artist-island .paint-settings .row-select a',
        /**
         * Registered click callback delegated to "#artist-island .paint-settings .row-select a". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, text.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          toggleArtistSetting(
            parseInt($(this).attr('data-id')),
            $(this).attr('data-type'),
            $(this).find('> div > span').text()
          );
        }
      );
      $(document).on(
        'click',
        '.create-framed-auction',
        /**
         * Registered click callback delegated to ".create-framed-auction". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/framed-painting.php.
         *
         * Observed DOM operations: val, attr, html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var artAuctionRequest = {};
          artAuctionRequest.auction = true;
          artAuctionRequest.duration = $(this).closest('.prow').find('[name="duration"]').val();
          artAuctionRequest.price = parseInt($(this).closest('.prow').find('[name="price"]').val());
          artAuctionRequest.painting_id = $(this).closest('.prow').find('.painting-bloc').attr('data-framed');
          var requestData = artAuctionRequest;
          if (requestData.price < 300) {
            alert('Starting bid price needs to be 300 PXP coins or more. This is art!');
            return;
          }
          if (
            confirm(
              'This painting will be removed from your account during the entire time of the auction and will be given to the highest bidder or returned to you if no one placed an offer. Would you like to continue?'
            )
          ) {
            $('#artist-island .inv-framed.sell').html(
              '<div class="loading"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
            );
            api.xhr.req('POST', '/api/framed-painting.php', requestData, true, function (success, response) {
              loadFramedArtForSale();
              if (success) {
                loadFramedArtAuctions();
                showNotification('success', 'Success', 'Listing created');
              } else {
                showNotification('error', 'Error', response.message);
              }
            });
          }
        }
      );
      $(document).on(
        'click',
        '.burn-framed-auction',
        /**
         * Registered click callback delegated to ".burn-framed-auction". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/framed-painting.php.
         *
         * Observed DOM operations: attr, html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var artBurnRequest = {};
          artBurnRequest.burn = true;
          artBurnRequest.painting_id = $(this).closest('.prow').find('.painting-bloc').attr('data-framed');
          var requestData = artBurnRequest;
          confirm(
            'Burning this painting will permanently destroy it. You are about to remove a part of history, would you like to continue?'
          ) &&
            ($('#artist-island .inv-framed.sell').html(
              '<div class="loading"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
            ),
            api.xhr.req('POST', '/api/framed-painting.php', requestData, true, function (success, response) {
              loadFramedArtForSale();
              if (success) {
                loadFramedArtAuctions();
                showNotification('success', 'Painting burned!', response.result);
              } else showNotification('error', 'Error', response.message);
            }));
        }
      );
      $(document).on(
        'click',
        'input[name="special_rainbow"]',
        /**
         * Registered click callback delegated to "input[name=\"special_rainbow\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: addClass, removeClass.
         */
        function () {
          if ($('input.special_rainbow').is(':checked'))
            $('#artist-island .paint-preview .painting-bloc > img')
              .removeClass('bg-transparent')
              .addClass('bg-transparent');
          else {
            $('#artist-island .paint-preview .painting-bloc > img').removeClass('bg-transparent');
          }
        }
      );
      function toggleArtistSetting(settingId, settingType, text) {
        $('#artist-island .paint-settings')
          .find('a[data-type="' + settingType + '"]')
          .removeClass('active');
        $('#artist-island .paint-settings')
          .find('a[data-id="' + settingId + '"][data-type="' + settingType + '"]')
          .addClass('active');
        $('.confirm-painting .recap > p[data-type="' + settingType + '"]').hide();
        $(
          '.confirm-painting .recap > p[data-id="' + settingId + '"][data-type="' + settingType + '"] .bold'
        ).text(text);
        $(
          '.confirm-painting .recap > p[data-id="' + settingId + '"][data-type="' + settingType + '"]'
        ).show();
        if (settingType === 'frame') {
          $('.paint-preview .bg-rainbow').hide();
          $('.checkrain').hide();
          if (settingId === 1) {
            $('.paint-preview .frame > img').attr('src', '/img/copper-frame-bg.png');
            $('#artist-island .paint-preview .painting-bloc > img').removeClass('bg-transparent');
          } else if (settingId === 2) {
            $('.paint-preview .frame > img').attr('src', '/img/iron-frame-bg.png');
            $('#artist-island .paint-preview .painting-bloc > img').removeClass('bg-transparent');
          } else if (settingId === 3) {
            $('.paint-preview .frame > img').attr('src', '/img/pyrite-frame-bg.png');
            $('#artist-island .paint-preview .painting-bloc > img').removeClass('bg-transparent');
          } else if (settingId === 4) {
            $('.paint-preview .frame > img').attr('src', '/img/pixelite-frame-bg.png?v=1');
            $('.paint-preview .bg-rainbow').show();
            if ($('input.special_rainbow').is(':checked'))
              $('#artist-island .paint-preview .painting-bloc > img')
                .removeClass('bg-transparent')
                .addClass('bg-transparent');
            else {
              $('#artist-island .paint-preview .painting-bloc > img').removeClass('bg-transparent');
            }
            $('.checkrain').show();
          }
        } else if (settingType === 'gems') {
          if (settingId === 1)
            $('.paint-preview .frame > div > img').attr('src', '/img/emerald-frame-bg.png');
          else if (settingId === 2)
            $('.paint-preview .frame > div > img').attr('src', '/img/sapphire-frame-bg.png');
          else
            settingId === 3 && $('.paint-preview .frame > div > img').attr('src', '/img/ruby-frame-bg.png');
        }
        var id = parseInt($('#artist-island .paint-settings a.active[data-type="frame"]').attr('data-id')),
          int = parseInt($('#artist-island .paint-settings a.active[data-type="gems"]').attr('data-id')),
          confirmPaintingElementText = 25 * id + 50 * int;
        $('.confirm-painting .recap > div[data-type="price"] b').text(confirmPaintingElementText);
      }
      /**
       * Direct network calls: GET /api/gembox.php.
       *
       * Observed DOM operations: html.
       */
      function loadFramedArtForSale() {
        $('#artist-island .inv-framed.sell').html(
          '<div class="loading"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
        );
        var requestData = {};
        requestData.framed = true;
        api.xhr.req(
          'GET',
          '/api/gembox.php',
          requestData,
          false,
          /**
           * HTTP completion callback for /api/gembox.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: serverData.user.ppcoins.
           *
           * Observed DOM operations: text, html, append, show, hide, attr.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              response.ppcoins !== undefined &&
                ((serverData.user.ppcoins = parseInt(response.ppcoins)),
                $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                  serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                ),
                $('.my-pp b').text(serverData.user.ppcoins));
              $('#artist-island .inv-framed.sell').html('');
              if (response.framed !== undefined && response.framed.length)
                for (var key in response.framed) {
                  var count = 0;
                  if (parseInt(response.framed[key].frame_id) === 1) count = 'copper-frame-bg.png';
                  else if (parseInt(response.framed[key].frame_id) === 2) count = 'iron-frame-bg.png';
                  else if (parseInt(response.framed[key].frame_id) === 3) count = 'pyrite-frame-bg.png';
                  else parseInt(response.framed[key].frame_id) === 4 && (count = 'pixelite-frame-bg.png?v=1');
                  var framedThumbnailOffset = 0;
                  if (parseInt(response.framed[key].gems_id) === 1)
                    framedThumbnailOffset = 'emerald-frame-bg.png';
                  else if (parseInt(response.framed[key].gems_id) === 2) {
                    framedThumbnailOffset = 'sapphire-frame-bg.png';
                  } else if (parseInt(response.framed[key].gems_id) === 3) {
                    framedThumbnailOffset = 'ruby-frame-bg.png';
                  }
                  var text = '',
                    framedThumbnailBackground = 'bg-transparent';
                  parseInt(response.framed[key].bg) > -1 &&
                    ((text = 'background-color:' + appState.painting.palette.colors[response.framed[key].bg]),
                    (framedThumbnailBackground = ''));
                  var element = $(
                    '<div class="prow"><div class="lt"><div class="painting-bloc" data-framed="' +
                      response.framed[key].id +
                      '">' +
                      ' <img src="/canvas/' +
                      response.framed[key].painting_id +
                      '.png?t=' +
                      (parseInt(response.framed[key].created_at) + 600) +
                      '" class="pixelate ' +
                      framedThumbnailBackground +
                      '" style="' +
                      text +
                      '">' +
                      ' <div class="frame"><div class="bg-sp sp-framed-' +
                      response.framed[key].sp +
                      '"></div><div class="bg-rainbow"></div><img src="/img/' +
                      count +
                      '" class="pixelate">' +
                      '     <div><img src="/img/' +
                      framedThumbnailOffset +
                      '"></div>' +
                      ' </div>' +
                      ' <a href="#" class="author open-profile" data-profile="" title="Author">' +
                      '     <div class="arrow"></div>' +
                      '     <div class="icns"></div>' +
                      '     <div class="author-name"></div>' +
                      ' </a>' +
                      '</div></div><div class="rt">' +
                      '<h1>Create auction</h1>' +
                      '<form>' +
                      '<div><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div> Price and duration</div>' +
                      '<input type="text" class="input-text" name="price" placeholder="Starting price">' +
                      '<select name="duration">' +
                      '<option value="1">1 hour</option>' +
                      '<option value="2">1 day</option>' +
                      '<option value="3">3 days</option>' +
                      '</select>' +
                      '<div class="pt-10">' +
                      'Listing fee: <b><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div><span>20</span></b><br/>' +
                      'Auction House cut: <b>25%</b>' +
                      '</div>' +
                      '<button class="btn mb-0 create-framed-auction inline-block">List painting</button><button class="btn mb-0 burn-framed-auction alert inline-block">Burn</button>' +
                      '</div>' +
                      '</div></div>'
                  );
                  $('#artist-island .inv-framed.sell').append(element);
                  if (parseInt(response.framed[key].frame_id) == 4) {
                    element.find('.bg-rainbow').show();
                  } else {
                    element.find('.bg-rainbow').hide();
                  }
                  element.find('.author-name').text(response.framed[key].author_username);
                  element
                    .find('.author.open-profile')
                    .attr('data-profile', response.framed[key].author_username);
                  if (response.framed[key].author_icons) {
                    var parts = response.framed[key].author_icons.split(',');
                    for (var partKey in parts) {
                      element
                        .find('.icns')
                        .append(
                          '<img src="/img/badges/' + parts[partKey] + '.png" class="badge" width="16">'
                        );
                    }
                  }
                }
              else
                $('#artist-island .inv-framed.sell').html("<div>You don't have any framed painting.</div>");
            }
          }
        );
      }
      /**
       * Direct network calls: GET /api/gembox.php.
       *
       * Observed DOM operations: html.
       */
      function loadFramedArtAuctions() {
        $('#artist-island .inv-framed.auctions').html(
          '<div class="loading"><span class="c-loader"><span class="c-loader-inner"></span></span></div>'
        );
        var requestData = {};
        requestData.ah = true;
        api.xhr.req(
          'GET',
          '/api/gembox.php',
          requestData,
          false,
          /**
           * HTTP completion callback for /api/gembox.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: serverData.user.ppcoins.
           *
           * Observed DOM operations: text, html, append, addClass, show, hide, attr.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              if (response.ppcoins !== undefined) {
                serverData.user.ppcoins = parseInt(response.ppcoins);
                $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                  serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                );
                $('.my-pp b').text(serverData.user.ppcoins);
              }
              $('#artist-island .inv-framed.auctions').html('');
              if (response.ah !== undefined && response.ah.length) {
                for (var key in response.ah) {
                  var count = 0;
                  if (parseInt(response.ah[key].frame_id) === 1) count = 'copper-frame-bg.png';
                  else if (parseInt(response.ah[key].frame_id) === 2) count = 'iron-frame-bg.png';
                  else if (parseInt(response.ah[key].frame_id) === 3) {
                    count = 'pyrite-frame-bg.png';
                  } else parseInt(response.ah[key].frame_id) === 4 && (count = 'pixelite-frame-bg.png?v=1');
                  var gETCount = 0;
                  if (parseInt(response.ah[key].gems_id) === 1) gETCount = 'emerald-frame-bg.png';
                  else if (parseInt(response.ah[key].gems_id) === 2) {
                    gETCount = 'sapphire-frame-bg.png';
                  } else parseInt(response.ah[key].gems_id) === 3 && (gETCount = 'ruby-frame-bg.png');
                  var text = '',
                    gETText = 'bg-transparent';
                  parseInt(response.ah[key].bg) > -1 &&
                    ((text = 'background-color:' + appState.painting.palette.colors[response.ah[key].bg]),
                    (gETText = ''));
                  var element = $(
                    '<div class="prow"><div class="lt"><div class="painting-bloc" data-framed="' +
                      response.ah[key].id +
                      '">' +
                      ' <img src="/canvas/' +
                      response.ah[key].painting_id +
                      '.png?t=' +
                      (parseInt(response.ah[key].created_at) + 600) +
                      '" class="pixelate ' +
                      gETText +
                      '" style="' +
                      text +
                      '">' +
                      ' <div class="frame"><div class="bg-sp sp-framed-' +
                      response.ah[key].sp +
                      '"></div><div class="bg-rainbow"></div><img src="/img/' +
                      count +
                      '" class="pixelate">' +
                      '     <div><img src="/img/' +
                      gETCount +
                      '"></div>' +
                      ' </div>' +
                      ' <a href="#" class="author open-profile" data-profile="" title="Author">' +
                      '     <div class="arrow"></div>' +
                      '     <div class="icns"></div>' +
                      '     <div class="author-name"></div>' +
                      ' </a>' +
                      '</div></div><div class="rt">' +
                      '<h1>Auction - Painting #' +
                      response.ah[key].id +
                      '</h1>' +
                      '<div class="pt-10">' +
                      'Bids: <b>' +
                      response.ah[key].bids +
                      '</b><br/>' +
                      'Last bid: <b><div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div><span>' +
                      response.ah[key].current_bid +
                      '</span></b> <span class="by">by</span> <b><a href="#" class="open-profile a_owner" data-profile=""></a></b><br/><br/>' +
                      'Time left: <b><span class="t-left"></span></b><br/>' +
                      'Seller: <b><a href="#" class="open-profile a_seller" data-profile=""></a></b>' +
                      '</div>' +
                      '<button class="btn mb-0 open-framed-auction" data-framed="' +
                      response.ah[key].id +
                      '">VIEW / BID</button>' +
                      '</div>' +
                      '</div></div>'
                  );
                  $('#artist-island .inv-framed.auctions').append(element);
                  var auctionExpireTime =
                    parseInt(response.ah[key].auction_expire_time) - parseInt(response.time);
                  element.find('.t-left').text(formatDuration(auctionExpireTime));
                  if (auctionExpireTime <= 60) {
                    !element.find('.t-left').hasClass('red') && element.find('.t-left').addClass('red');
                  }
                  parseInt(response.ah[key].frame_id) === 4
                    ? element.find('.bg-rainbow').show()
                    : element.find('.bg-rainbow').hide();
                  if (
                    !response.ah[key].current_bid_username ||
                    !response.ah[key].current_bid_username.length
                  ) {
                    element.find('.by').hide();
                  }
                  element.find('.a_owner').text(response.ah[key].current_bid_username);
                  element.find('.a_owner').attr('data-profile', response.ah[key].current_bid_username);
                  element.find('.a_seller').attr('data-profile', response.ah[key].owner_username);
                  element.find('.a_seller').text(response.ah[key].owner_username);
                  element.find('.author-name').text(response.ah[key].author_username);
                  element.find('.author.open-profile').attr('data-profile', response.ah[key].author_username);
                  if (response.ah[key].author_icons) {
                    var parts = response.ah[key].author_icons.split(',');
                    for (var partKey in parts) {
                      element
                        .find('.icns')
                        .append(
                          '<img src="/img/badges/' + parts[partKey] + '.png" class="badge" width="16">'
                        );
                    }
                  }
                }
              } else $('#artist-island .inv-framed.auctions').html('<div>No listings yet</div>');
            }
          }
        );
      }
      /**
       * Direct network calls: GET /api/gembox.php.
       *
       * Observed DOM operations: hide, show, removeClass, css, attr, text, html.
       */
      function openArtistIsland() {
        $('#profile').hide();
        $('#guild').hide();
        $('#item').hide();
        $('#coin-island').hide();
        $('#gold-rush').hide();
        $('#artist-island .box-content-x > div').hide();
        $('#artist-island .box-x').show();
        $('#artist-island .box-content-x > .loading').show();
        $('#artist-island').show();
        $('.gold-prog .bar-progress .bar').removeClass('completed');
        $('.gold-prog .bar-progress .bar').css('width', '0%');
        toggleArtistSetting(
          parseInt($('#artist-island .paint-settings a.active[data-type="frame"]').attr('data-id')),
          'frame',
          $('#artist-island .paint-settings a.active[data-type="frame"]').find('> div > span').text()
        );
        toggleArtistSetting(
          parseInt($('#artist-island .paint-settings a.active[data-type="gems"]').attr('data-id')),
          'gems',
          $('#artist-island .paint-settings a.active[data-type="gems"]').find('> div > span').text()
        );
        $('#artist-island .painting-bloc').attr('data-id', '');
        $('#artist-island .painting-bloc > img').attr('src', '/img/frame-default.png');
        $('#artist-island .paint-preview .author .author-name').text(serverData.user.name);
        $('#artist-island .paint-preview .author').attr('data-profile', serverData.user.name);
        var html = '';
        for (var key in serverData.user.icons) {
          html += '<img src="/img/badges/' + serverData.user.icons[key] + '.png" class="badge" width="16">';
        }
        $('#artist-island .paint-preview .author .icns').html(html);
        var requestData = {};
        requestData.inventory = true;
        requestData.paintings = true;
        api.xhr.req(
          'GET',
          '/api/gembox.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/gembox.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: serverData.user.ppcoins.
           *
           * Observed DOM operations: text, html, show, hide.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              response.ppcoins !== undefined &&
                ((serverData.user.ppcoins = parseInt(response.ppcoins)),
                $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                  serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                ),
                $('.my-pp b').text(serverData.user.ppcoins));
              if (response.canvas !== undefined && response.canvas.length) {
                var html = '';
                for (var key in response.canvas) {
                  html +=
                    '<a href="#" class="choose-paint" data-color="' +
                    response.canvas[key].defaultColor +
                    '" data-id="' +
                    response.canvas[key].id +
                    '"><img src="/canvas/' +
                    response.canvas[key].id +
                    '.png?t=' +
                    nowSeconds() +
                    '"  style="background-color:' +
                    appState.painting.palette.colors[response.canvas[key].defaultColor] +
                    '" ></a>';
                }
                $('.paint-list').html(html);
              } else {
                $('.paint-list').html(
                  '<div class="red">You don\'t have any 100x100 painting.</div><a href="#" class="secondary new-painting create-new-painting-from-list btn open-pt-create">Create a 100 x 100 Painting</a>'
                );
              }
              loadFramedArtForSale();
              loadFramedArtAuctions();
              $('#artist-island .box-content-x > div').show();
              $('#artist-island .box-content-x > .loading').hide();
              $('.copper-ore-count').text(response.copper_ores);
              $('.iron-ore-count').text(response.iron_ores);
              $('.pyrite-ore-count').text(response.pyrite_ores);
              $('.emerald-count').text(response.emerald_stones);
              $('.sapphire-count').text(response.sapphire_stones);
              $('.ruby-count').text(response.ruby_stones);
              $('.gold-ore-count').text(response.gold_ores);
              $('.pixelite-ore-count').text(response.pixelite_ores);
            }
          }
        );
      }
      /**
       * Direct network calls: GET /api/get-gold-rush-island.php.
       *
       * Observed DOM operations: hide, show, removeClass, css.
       */
      openGoldShop = function () {
        $('#profile').hide();
        $('#guild').hide();
        $('#item').hide();
        $('#coin-island').hide();
        $('#artist-island').hide();
        $('#gembox').hide();
        $('#gold-rush .box-content-x > div').hide();
        $('#gold-rush .box-x').show();
        $('#gold-rush .box-content-x > .loading').show();
        $('#gold-rush').show();
        $('.gold-prog .bar-progress .bar').removeClass('completed');
        $('.gold-prog .bar-progress .bar').css('width', '0%');
        api.xhr.req(
          'GET',
          '/api/get-gold-rush-island.php',
          {},
          true,
          /**
           * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: auctionFeeRate, auctionSellPrice, toolUpgradePrices, dynamiteUpgradePrices, serverData.user.ppcoins.
           *
           * Observed DOM operations: val, text, html, show, hide, addClass, removeClass, attr.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            if (success) {
              auctionFeeRate = parseInt(response.ah_fee);
              auctionSellPrice = parseInt(response.ah_min_price);
              toolUpgradePrices = response.upgrades_price;
              dynamiteUpgradePrices = response.dynamite_price;
              $('[name="ah_sell"] [name="ah_sell_price"]').val(auctionSellPrice);
              $('#gold-rush .ah_cut').text(response.ah_cut + '%');
              var text = 'class="stripped"',
                count = 1,
                html =
                  '<tr><td>#</td><td class="text-left">Player</td><td>Tools</td><td>Dynamite</td><td>Ores</td><td>Bars</td></tr>';
              for (var key in response.top) {
                var gETText = '';
                count <= 5 && (gETText = 'bold');
                html +=
                  '<tr ' +
                  text +
                  '><td class="' +
                  gETText +
                  '">' +
                  count +
                  '</td><td class="text-left ' +
                  gETText +
                  '"><a href="#" class="open-profile" data-profile="' +
                  response.top[key].username +
                  '">' +
                  response.top[key].username +
                  '</a></td><td class="' +
                  gETText +
                  '">' +
                  response.top[key].gold_mine_level +
                  '</td><td class="' +
                  gETText +
                  '">' +
                  response.top[key].gold_dynamite_level +
                  '</td><td class="' +
                  gETText +
                  '">' +
                  response.top[key].gold_ores +
                  '</td><td class="' +
                  gETText +
                  '">' +
                  response.top[key].gold_bars +
                  '</td></tr>';
                text === '' ? (text = 'class="stripped"') : (text = '');
                count++;
              }
              $('#gold-rush .top-gold table').html(html);
              $('#gold-rush .box-content-x > div').show();
              $('#gold-rush .box-content-x > .loading').hide();
              $('#gold-rush .gold-bar-price').text(response.gold_bar_price);
              response.user &&
                (updateGoldToolUpgrade(response.user.gold_mine_level),
                updateDynamiteUpgrade(response.user.gold_dynamite_level));
              response.user && response.user.mineOnCD
                ? $('#gold-rush .mine-gold')
                    .text('Come back tomorrow')
                    .removeClass('disabled')
                    .addClass('disabled')
                : $('#gold-rush .mine-gold').text('Click to mine Gold ores').removeClass('disabled');
              response.user && response.user.ppcoins
                ? ((serverData.user.ppcoins = response.user.ppcoins),
                  $('.my-pp b').text(serverData.user.ppcoins))
                : $('.my-pp b').text('');
              if (response.user && response.user.gold_ores) {
                $('#gold-rush .gold-ore-count').text(response.user.gold_ores);
              } else $('#gold-rush .gold-ore-count').text(0);
              response.user && response.user.gold_mine_level
                ? ($('#gold-rush .gold-items-level').text(response.user.gold_mine_level),
                  $('#gold-rush .img-gold-tools-current').attr(
                    'src',
                    '/img/gold-tools-' + response.user.gold_mine_level + '.png'
                  ))
                : ($('#gold-rush .gold-items-level').text(1),
                  $('#gold-rush .img-gold-tools-current').attr('src', '/img/gold-tools-1.png'));
              response.user && response.user.gold_dynamite_level
                ? ($('#gold-rush .gold-dynamite-level').text(response.user.gold_dynamite_level),
                  $('#gold-rush .img-gold-dynamite-current').attr(
                    'src',
                    '/img/gold-bomb-' + response.user.gold_dynamite_level + '.png?v=1'
                  ))
                : ($('#gold-rush .gold-dynamite-level').text(1),
                  $('#gold-rush .img-gold-dynamite-current').attr('src', '/img/gold-bomb-1.png?v=1'));
              if (response.user && response.user.gold_bars) {
                $('#gold-rush .gold-bar-count').text(response.user.gold_bars);
              } else {
                $('#gold-rush .gold-bar-count').text(0);
              }
              loadAuctionRows();
              $('.ah-chart').html('<iframe src="/gold-chart.php"></iframe>');
            }
          }
        );
      };
      var toolOddsVisible = false;
      $(document).on(
        'click',
        '.level-perks',
        /**
         * Registered click callback delegated to ".level-perks". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: toolOddsVisible.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (toolOddsVisible) {
            toolOddsVisible = false;
            $('.gold-odds').slideUp();
          } else {
            toolOddsVisible = true;
            $('.gold-odds').slideDown();
          }
        }
      );
      var dynamiteOddsVisible = false;
      $(document).on(
        'click',
        '.level-perks-dynamite',
        /**
         * Registered click callback delegated to ".level-perks-dynamite". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: dynamiteOddsVisible.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (dynamiteOddsVisible) {
            dynamiteOddsVisible = false;
            $('.gold-odds-dynamite').slideUp();
          } else {
            dynamiteOddsVisible = true;
            $('.gold-odds-dynamite').slideDown();
          }
        }
      );
      function updateAuctionFee() {
        var inputValue = parseInt($('[name="ah_sell"] [name="ah_sell_amount"]').val());
        !isNaN(inputValue) ? $('.ah_fee').text(inputValue * auctionFeeRate) : $('.ah_fee').text('-');
      }
      $(document).on(
        'click',
        '.ah-display-sell',
        /**
         * Registered click callback delegated to ".ah-display-sell". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide, val.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.ah-display-sell').hide();
          $('.ah-sell-form').slideDown();
          $('[name="ah_sell"] [name="ah_sell_amount"]').val(1);
          $('[name="ah_sell"] [name="ah_sell_price"]').val(auctionSellPrice);
          updateAuctionFee();
        }
      );
      $(document).on('input', '[name="ah_sell"] [name="ah_sell_price"]', function (event) {
        event.preventDefault();
        updateAuctionFee();
      });
      $(document).on('input', '[name="ah_sell"] [name="ah_sell_amount"]', function (event) {
        event.preventDefault();
        updateAuctionFee();
      });
      $(document).on(
        'click',
        '.ah-cancel',
        /**
         * Registered click callback delegated to ".ah-cancel". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (confirm('Would you like to cancel this auction? Deposit fee will be lost')) {
            var id = $(this).attr('data-id'),
              requestData = {};
            requestData.cancel = true;
            requestData.id = id;
            api.xhr.req(
              'POST',
              '/api/get-gold-rush-island.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: auctionOffset, auctionTab.
               *
               * Observed DOM operations: text, removeClass, addClass.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  $('.gold-bar-count').text(response.gold_bars);
                  auctionOffset = 0;
                  auctionTab = 'my';
                  $('.ah-all, .ah-my').removeClass('active');
                  $('.ah-my').addClass('active');
                  loadAuctionRows();
                  showNotification('success', 'Auction canceled', '');
                } else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.ah-buy',
        /**
         * Registered click callback delegated to ".ah-buy". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var price = $(this).attr('data-price'),
            amount = prompt(
              'How many Gold bars do you want to buy at this price ? (max: ' +
                $(this).attr('data-total') +
                ')'
            );
          if (amount) {
            var requestData = {};
            requestData.buy = true;
            requestData.price = price;
            requestData.amount = amount;
            api.xhr.req(
              'POST',
              '/api/get-gold-rush-island.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: serverData.user.ppcoins, auctionOffset, auctionTab.
               *
               * Observed DOM operations: text, removeClass, addClass, html.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  serverData.user.ppcoins = parseInt(response.ppcoins);
                  $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                    serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                  );
                  $('.my-pp b').text(serverData.user.ppcoins);
                  $('.gold-bar-count').text(response.gold_bars);
                  showNotification('success', 'Gold bar(s) added to your inventory', '');
                } else {
                  showNotification('error', 'Error', response.message);
                }
                auctionOffset = 0;
                auctionTab = 'all';
                $('.ah-all, .ah-my').removeClass('active');
                $('.ah-all').addClass('active');
                loadAuctionRows();
                $('.ah-chart').html('<iframe src="/gold-chart.php"></iframe>');
              }
            );
          }
        }
      );
      var auctionSalePending = false;
      $(document).on(
        'submit',
        '[name="ah_sell"]',
        /**
         * Registered submit callback delegated to "[name=\"ah_sell\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Shared/receiver state written: auctionSalePending.
         *
         * Observed DOM operations: val, html.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var amount = parseInt($('[name="ah_sell"] [name="ah_sell_amount"]').val()),
            price = parseInt($('[name="ah_sell"] [name="ah_sell_price"]').val());
          if (!isNaN(amount) && !isNaN(price)) {
            if (price < auctionSellPrice)
              alert('Minimum unit price allowed: ' + auctionSellPrice + ' PP coins');
            else if (!auctionSalePending) {
              auctionSalePending = true;
              $('.ah_table tbody').html(
                '<tr class="ah-loading"><td colspan="4"><div class="loading-table tiny"><span class="c-loader"><span class="c-loader-inner"></span></span></div></td></tr>'
              );
              var requestData = {};
              requestData.sell = true;
              requestData.amount = amount;
              requestData.price = price;
              api.xhr.req(
                'POST',
                '/api/get-gold-rush-island.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Shared/receiver state written: auctionSalePending, serverData.user.ppcoins, auctionOffset, auctionTab.
                 *
                 * Observed DOM operations: text, removeClass, addClass.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  auctionSalePending = false;
                  success
                    ? ((serverData.user.ppcoins = parseInt(response.ppcoins)),
                      $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                        serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                      ),
                      $('.my-pp b').text(serverData.user.ppcoins),
                      $('.gold-bar-count').text(response.gold_bars),
                      (auctionOffset = 0),
                      (auctionTab = 'my'),
                      $('.ah-all, .ah-my').removeClass('active'),
                      $('.ah-my').addClass('active'),
                      loadAuctionRows(),
                      showNotification('success', 'Auction(s) created', ''))
                    : (showNotification('error', 'Error', response.message), loadAuctionRows());
                }
              );
            }
          } else alert('Please enter only plain numbers');
        }
      );
      var miningResult = null,
        miningActive = false;
      $(document).on(
        'click',
        '.mine-gold',
        /**
         * Registered click callback delegated to ".mine-gold". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Shared/receiver state written: miningActive.
         *
         * Observed DOM operations: text, removeClass, css.
         *
         * Scheduled work: setInterval (10 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var goldMiningElement = $('.gold-mining');
          if (!miningActive) {
            miningActive = true;
            goldMiningElement.find('.bar-text').text('Mining');
            goldMiningElement.find('.bar-progress .bar').removeClass('completed');
            goldMiningElement.find('.bar-progress .bar').css('width', '0%');
            var count = 2000,
              timestamp = nowMilliseconds(),
              miningCompletesAt = timestamp + count;
            miningInterval && clearInterval(miningInterval);
            var requestData = {};
            requestData.mine = true;
            api.xhr.req(
              'POST',
              '/api/get-gold-rush-island.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: miningResult, miningActive.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) miningResult = response;
                else {
                  miningResult = -1;
                  showNotification('error', 'Error', response.message);
                  miningActive = false;
                }
              }
            );
            var miningInterval = setInterval(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Shared/receiver state written: miningInterval, miningActive, miningResult.
               *
               * Observed DOM operations: text, css, removeClass, html, addClass.
               *
               * Scheduled work: setTimeout (2200 ms), setTimeout (2000 ms).
               */
              function () {
                var miningMillisecondsRemaining = miningCompletesAt - nowMilliseconds();
                if (miningResult === -1) {
                  clearInterval(miningInterval);
                  miningInterval = null;
                  goldMiningElement.find('.bar-text').text('Gold Mine');
                  goldMiningElement.find('.bar-progress .bar').css('width', '0%');
                  goldMiningElement.find('.bar-progress .bar').removeClass('completed');
                  goldMiningElement.find('.notification').html('');
                  miningActive = false;
                } else if (miningMillisecondsRemaining <= 0) {
                  goldMiningElement.find('.bar-progress .bar').css('width', '110%');
                  goldMiningElement.find('.bar-progress .bar').removeClass('completed').addClass('completed');
                  goldMiningElement.find('.bar-text').text('Success!');
                  if (miningResult !== null) {
                    clearInterval(miningInterval);
                    miningInterval = null;
                    goldMiningElement
                      .find('.notification')
                      .html(
                        '<div class="reward winUp' +
                          miningResult.big +
                          '"><div>+' +
                          miningResult.amount +
                          '</div><div><img src="/img/gold-ore.png"></div></div>'
                      );
                    $('.gold-ore-count').text(miningResult.total);
                    if (parseInt(miningResult.extra) === 1) {
                      var goldDynamiteLevel = miningResult.gold_dynamite_level;
                      setTimeout(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Observed DOM operations: html.
                         *
                         * Scheduled work: setTimeout (2200 ms).
                         */
                        function () {
                          goldMiningElement
                            .find('.notificationDynamite')
                            .html(
                              '<div class="reward winUp0"><div>+1</div><div><img src="/img/gold-bomb-' +
                                goldDynamiteLevel +
                                '.png?v=1"></div></div>'
                            );
                          setTimeout(
                            /**
                             * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                             *
                             * Shared/receiver state written: miningActive.
                             *
                             * Observed DOM operations: text, css, removeClass, html.
                             */
                            function () {
                              goldMiningElement.find('.bar-text').text('Gold Mine');
                              goldMiningElement.find('.bar-progress .bar').css('width', '0%');
                              goldMiningElement.find('.bar-progress .bar').removeClass('completed');
                              goldMiningElement.find('.notification').html('');
                              goldMiningElement.find('.notificationDynamite').html('');
                              $('#gold-rush .mine-gold')
                                .text('Click to mine Gold Ores')
                                .removeClass('disabled');
                              miningActive = false;
                            },
                            2200
                          );
                        },
                        2200
                      );
                    } else
                      setTimeout(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Shared/receiver state written: miningActive.
                         *
                         * Observed DOM operations: text, css, removeClass, html, addClass.
                         */
                        function () {
                          goldMiningElement.find('.bar-text').text('Gold Mine');
                          goldMiningElement.find('.bar-progress .bar').css('width', '0%');
                          goldMiningElement.find('.bar-progress .bar').removeClass('completed');
                          goldMiningElement.find('.notification').html('');
                          $('#gold-rush .mine-gold')
                            .text('Come back tomorrow')
                            .removeClass('disabled')
                            .addClass('disabled');
                          miningActive = false;
                        },
                        2000
                      );
                    miningResult = null;
                  }
                } else {
                  var barProgressBarMiningMillisecondsRemaining =
                    100 - (miningMillisecondsRemaining / count) * 100;
                  goldMiningElement
                    .find('.bar-progress .bar')
                    .css('width', barProgressBarMiningMillisecondsRemaining + '%');
                }
              },
              10
            );
          }
        }
      );
      var craftingResult = null,
        craftingActive = false;
      $(document).on(
        'click',
        '.create-pixelite',
        /**
         * Registered click callback delegated to ".create-pixelite". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Shared/receiver state written: craftingActive.
         *
         * Observed DOM operations: text, removeClass, css.
         *
         * Scheduled work: setInterval (10 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var pixeliteCraftingElement = $('.pixelite-crafting');
          if (!craftingActive) {
            craftingActive = true;
            pixeliteCraftingElement.find('.bar-text').text('Crafting');
            pixeliteCraftingElement.find('.bar-progress .bar').removeClass('completed');
            pixeliteCraftingElement.find('.bar-progress .bar').css('width', '0%');
            var count = 8000,
              timestamp = nowMilliseconds(),
              craftingCompletesAt = timestamp + count;
            craftingInterval && clearInterval(craftingInterval);
            var requestData = {};
            requestData.pixelite = true;
            api.xhr.req(
              'POST',
              '/api/get-gold-rush-island.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: craftingResult, craftingActive.
               *
               * Observed DOM operations: text.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                success
                  ? ((craftingResult = response),
                    $('.copper-ore-count').text(response.inventory.copper_ores),
                    $('.iron-ore-count').text(response.inventory.iron_ores),
                    $('.pyrite-ore-count').text(response.inventory.pyrite_ores),
                    $('.emerald-count').text(response.inventory.emerald_stones),
                    $('.sapphire-count').text(response.inventory.sapphire_stones),
                    $('.ruby-count').text(response.inventory.ruby_stones))
                  : ((craftingResult = -1),
                    showNotification('error', 'Error', response.message),
                    (craftingActive = false));
              }
            );
            var craftingInterval = setInterval(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Shared/receiver state written: craftingInterval, craftingActive, craftingResult.
               *
               * Observed DOM operations: text, css, removeClass, html, addClass.
               *
               * Scheduled work: setTimeout (2000 ms).
               */
              function () {
                var craftingMillisecondsRemaining = craftingCompletesAt - nowMilliseconds();
                if (craftingResult === -1) {
                  clearInterval(craftingInterval);
                  craftingInterval = null;
                  pixeliteCraftingElement.find('.bar-text').text('Pixelite');
                  pixeliteCraftingElement.find('.bar-progress .bar').css('width', '0%');
                  pixeliteCraftingElement.find('.bar-progress .bar').removeClass('completed');
                  pixeliteCraftingElement.find('.notification').html('');
                  craftingActive = false;
                } else if (craftingMillisecondsRemaining <= 0) {
                  pixeliteCraftingElement.find('.bar-progress .bar').css('width', '110%');
                  pixeliteCraftingElement
                    .find('.bar-progress .bar')
                    .removeClass('completed')
                    .addClass('completed');
                  pixeliteCraftingElement.find('.bar-text').text('Success!');
                  craftingResult !== null &&
                    (clearInterval(craftingInterval),
                    (craftingInterval = null),
                    pixeliteCraftingElement
                      .find('.notification')
                      .html(
                        '<div class="reward winUp' +
                          craftingResult.big +
                          '"><div>+' +
                          craftingResult.amount +
                          '</div><div><img src="/img/pixelite.png?v=1"></div></div>'
                      ),
                    $('.pixelite-ore-count').text(craftingResult.inventory.pixelite_ores),
                    setTimeout(
                      /**
                       * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                       *
                       * Shared/receiver state written: craftingActive.
                       *
                       * Observed DOM operations: text, css, removeClass, html, addClass.
                       */
                      function () {
                        pixeliteCraftingElement.find('.bar-text').text('Pixelite');
                        pixeliteCraftingElement.find('.bar-progress .bar').css('width', '0%');
                        pixeliteCraftingElement.find('.bar-progress .bar').removeClass('completed');
                        pixeliteCraftingElement.find('.notification').html('');
                        $('.create-pixelite')
                          .text('Click to create Pixelite')
                          .removeClass('disabled')
                          .addClass('disabled');
                        craftingActive = false;
                      },
                      2000
                    ),
                    (craftingResult = null));
                } else {
                  var craftingProgressPercent = 100 - (craftingMillisecondsRemaining / count) * 100;
                  pixeliteCraftingElement
                    .find('.bar-progress .bar')
                    .css('width', craftingProgressPercent + '%');
                }
              },
              10
            );
          }
        }
      );
      var smeltingResult = null,
        smeltingActive = false;
      $(document).on(
        'click',
        '.smelt-gold',
        /**
         * Registered click callback delegated to ".smelt-gold". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Shared/receiver state written: smeltingActive.
         *
         * Observed DOM operations: text, removeClass, css.
         *
         * Scheduled work: setInterval (10 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var goldSmeltingElement = $('.gold-smelting');
          if (!smeltingActive) {
            smeltingActive = true;
            goldSmeltingElement.find('.bar-text').text('Smelting');
            goldSmeltingElement.find('.bar-progress .bar').removeClass('completed');
            goldSmeltingElement.find('.bar-progress .bar').css('width', '0%');
            var count = 8000,
              timestamp = nowMilliseconds(),
              smeltingCompletesAt = timestamp + count;
            smeltingInterval && clearInterval(smeltingInterval);
            var requestData = {};
            requestData.smelt = true;
            api.xhr.req(
              'POST',
              '/api/get-gold-rush-island.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: smeltingResult, smeltingActive.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  smeltingResult = response;
                } else {
                  smeltingResult = -1;
                  showNotification('error', 'Error', response.message);
                  smeltingActive = false;
                }
              }
            );
            var smeltingInterval = setInterval(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Shared/receiver state written: smeltingInterval, smeltingActive, smeltingResult.
               *
               * Observed DOM operations: text, css, removeClass, html, addClass.
               *
               * Scheduled work: setTimeout (4000 ms).
               */
              function () {
                var smeltingMillisecondsRemaining = smeltingCompletesAt - nowMilliseconds();
                if (smeltingResult === -1) {
                  clearInterval(smeltingInterval);
                  smeltingInterval = null;
                  goldSmeltingElement.find('.bar-text').text('Melting Furnace');
                  goldSmeltingElement.find('.bar-progress .bar').css('width', '0%');
                  goldSmeltingElement.find('.bar-progress .bar').removeClass('completed');
                  goldSmeltingElement.find('.notification').html('');
                  smeltingActive = false;
                } else if (smeltingMillisecondsRemaining <= 0) {
                  goldSmeltingElement.find('.bar-progress .bar').css('width', '110%');
                  goldSmeltingElement
                    .find('.bar-progress .bar')
                    .removeClass('completed')
                    .addClass('completed');
                  goldSmeltingElement.find('.bar-text').text('Success!');
                  smeltingResult !== null &&
                    (clearInterval(smeltingInterval),
                    (smeltingInterval = null),
                    (smeltingActive = false),
                    goldSmeltingElement
                      .find('.notification')
                      .html(
                        '<div class="reward winUp' +
                          smeltingResult.big +
                          '"><div>+' +
                          smeltingResult.amount +
                          '</div><div><img src="/img/gold-bar.png?v=2"></div></div>'
                      ),
                    $('.gold-ore-count').text(smeltingResult.gold_ores),
                    $('.gold-bar-count').text(smeltingResult.gold_bars),
                    setTimeout(
                      /**
                       * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                       *
                       * Observed DOM operations: text, css, removeClass, html.
                       */
                      function () {
                        goldSmeltingElement.find('.bar-text').text('Melting Furnace');
                        goldSmeltingElement.find('.bar-progress .bar').css('width', '0%');
                        goldSmeltingElement.find('.bar-progress .bar').removeClass('completed');
                        goldSmeltingElement.find('.notification').html('');
                        $('#gold-rush .smelt-gold').removeClass('disabled');
                      },
                      4000
                    ),
                    (smeltingResult = null));
                } else {
                  var smeltingProgressPercent = 100 - (smeltingMillisecondsRemaining / count) * 100;
                  goldSmeltingElement.find('.bar-progress .bar').css('width', smeltingProgressPercent + '%');
                }
              },
              10
            );
          }
        }
      );
      var toolUpgradeInterval = null,
        toolUpgradeResult = null,
        toolUpgradeActive = false;
      $(document).on(
        'click',
        '.upgrade-gold',
        /**
         * Registered click callback delegated to ".upgrade-gold". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Shared/receiver state written: toolUpgradeActive, toolUpgradeInterval.
         *
         * Observed DOM operations: text, removeClass, css.
         *
         * Scheduled work: setInterval (10 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var goldUpgradeElement = $('.gold-upgrade');
          if (!toolUpgradeActive) {
            if (
              confirm(
                'You are about spend some Gold Bar to upgrade your mining items, would you like to continue?'
              )
            ) {
              toolUpgradeActive = true;
              goldUpgradeElement.find('.bar-text').text('Upgrading');
              goldUpgradeElement.find('.bar-progress .bar').removeClass('completed');
              goldUpgradeElement.find('.bar-progress .bar').css('width', '0%');
              var count = 8000,
                timestamp = nowMilliseconds(),
                toolUpgradeCompletesAt = timestamp + count;
              toolUpgradeInterval && clearInterval(toolUpgradeInterval);
              var requestData = {};
              requestData.upgrade = true;
              api.xhr.req(
                'POST',
                '/api/get-gold-rush-island.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Shared/receiver state written: toolUpgradeResult, toolUpgradeActive.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  if (success) {
                    toolUpgradeResult = response;
                  } else {
                    toolUpgradeResult = -1;
                    showNotification('error', 'Error', response.message);
                    toolUpgradeActive = false;
                  }
                }
              );
              toolUpgradeInterval = setInterval(
                /**
                 * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                 *
                 * Shared/receiver state written: toolUpgradeInterval, toolUpgradeActive, toolUpgradeResult.
                 *
                 * Observed DOM operations: text, css, removeClass, html, addClass, attr.
                 *
                 * Scheduled work: setTimeout (4000 ms).
                 */
                function () {
                  var toolUpgradeMillisecondsRemaining = toolUpgradeCompletesAt - nowMilliseconds();
                  if (toolUpgradeResult === -1) {
                    clearInterval(toolUpgradeInterval);
                    toolUpgradeInterval = null;
                    goldUpgradeElement.find('.bar-text').text('Mining Tools');
                    goldUpgradeElement.find('.bar-progress .bar').css('width', '0%');
                    goldUpgradeElement.find('.bar-progress .bar').removeClass('completed');
                    goldUpgradeElement.find('.notification').html('');
                    toolUpgradeActive = false;
                  } else if (toolUpgradeMillisecondsRemaining <= 0) {
                    goldUpgradeElement.find('.bar-progress .bar').css('width', '110%');
                    goldUpgradeElement
                      .find('.bar-progress .bar')
                      .removeClass('completed')
                      .addClass('completed');
                    goldUpgradeElement.find('.bar-text').text('Success!');
                    toolUpgradeResult !== null &&
                      (clearInterval(toolUpgradeInterval),
                      (toolUpgradeInterval = null),
                      (toolUpgradeActive = false),
                      goldUpgradeElement
                        .find('.notification')
                        .html(
                          '<div class="reward winUp' +
                            toolUpgradeResult.big +
                            '"><div>Lvl. ' +
                            toolUpgradeResult.gold_mine_level +
                            '</div><div><img src="/img/gold-tools-' +
                            toolUpgradeResult.gold_mine_level +
                            '.png"></div></div>'
                        ),
                      updateGoldToolUpgrade(toolUpgradeResult.gold_mine_level),
                      $('.gold-ore-count').text(toolUpgradeResult.gold_ores),
                      $('.gold-bar-count').text(toolUpgradeResult.gold_bars),
                      $('#gold-rush .gold-items-level').text(toolUpgradeResult.gold_mine_level),
                      $('#gold-rush .img-gold-tools-current').attr(
                        'src',
                        '/img/gold-tools-' + toolUpgradeResult.gold_mine_level + '.png'
                      ),
                      setTimeout(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Observed DOM operations: css, removeClass, html.
                         */
                        function () {
                          goldUpgradeElement.find('.bar-progress .bar').css('width', '0%');
                          goldUpgradeElement.find('.bar-progress .bar').removeClass('completed');
                          goldUpgradeElement.find('.notification').html('');
                        },
                        4000
                      ),
                      (toolUpgradeResult = null));
                  } else {
                    var barProgressBarToolUpgradeMillisecondsRemaining =
                      100 - (toolUpgradeMillisecondsRemaining / count) * 100;
                    goldUpgradeElement
                      .find('.bar-progress .bar')
                      .css('width', barProgressBarToolUpgradeMillisecondsRemaining + '%');
                  }
                },
                10
              );
            }
          }
        }
      );
      var dynamiteUpgradeResult = null,
        unusedUpgradeFlag = false,
        dynamiteUpgradeInterval = null;
      $(document).on(
        'click',
        '.upgrade-gold-dynamite',
        /**
         * Registered click callback delegated to ".upgrade-gold-dynamite". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-gold-rush-island.php.
         *
         * Shared/receiver state written: unusedUpgradeFlag, dynamiteUpgradeInterval.
         *
         * Observed DOM operations: text, removeClass, css.
         *
         * Scheduled work: setInterval (10 ms).
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var goldUpgradeDynamiteElement = $('.gold-upgrade-dynamite');
          if (!toolUpgradeActive) {
            if (
              confirm(
                'You are about spend some PP coins to upgrade your Dynamite power, would you like to continue?'
              )
            ) {
              unusedUpgradeFlag = true;
              goldUpgradeDynamiteElement.find('.bar-text').text('Upgrading');
              goldUpgradeDynamiteElement.find('.bar-progress .bar').removeClass('completed');
              goldUpgradeDynamiteElement.find('.bar-progress .bar').css('width', '0%');
              var count = 8000,
                timestamp = nowMilliseconds(),
                dynamiteUpgradeCompletesAt = timestamp + count;
              if (dynamiteUpgradeInterval) {
                clearInterval(dynamiteUpgradeInterval);
              }
              var requestData = {};
              requestData.upgradeDynamite = true;
              api.xhr.req(
                'POST',
                '/api/get-gold-rush-island.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/get-gold-rush-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Shared/receiver state written: dynamiteUpgradeResult, unusedUpgradeFlag.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  success
                    ? (dynamiteUpgradeResult = response)
                    : ((dynamiteUpgradeResult = -1),
                      showNotification('error', 'Error', response.message),
                      (unusedUpgradeFlag = false));
                }
              );
              dynamiteUpgradeInterval = setInterval(
                /**
                 * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                 *
                 * Shared/receiver state written: dynamiteUpgradeInterval, unusedUpgradeFlag, serverData.user.ppcoins, dynamiteUpgradeResult.
                 *
                 * Observed DOM operations: text, css, removeClass, html, addClass, attr.
                 *
                 * Scheduled work: setTimeout (4000 ms).
                 */
                function () {
                  var dynamiteUpgradeMillisecondsRemaining = dynamiteUpgradeCompletesAt - nowMilliseconds();
                  if (dynamiteUpgradeResult === -1) {
                    clearInterval(dynamiteUpgradeInterval);
                    dynamiteUpgradeInterval = null;
                    goldUpgradeDynamiteElement.find('.bar-text').text('Mining Tools');
                    goldUpgradeDynamiteElement.find('.bar-progress .bar').css('width', '0%');
                    goldUpgradeDynamiteElement.find('.bar-progress .bar').removeClass('completed');
                    goldUpgradeDynamiteElement.find('.notification').html('');
                    unusedUpgradeFlag = false;
                  } else if (dynamiteUpgradeMillisecondsRemaining <= 0) {
                    goldUpgradeDynamiteElement.find('.bar-progress .bar').css('width', '110%');
                    goldUpgradeDynamiteElement
                      .find('.bar-progress .bar')
                      .removeClass('completed')
                      .addClass('completed');
                    goldUpgradeDynamiteElement.find('.bar-text').text('Success!');
                    dynamiteUpgradeResult !== null &&
                      (clearInterval(dynamiteUpgradeInterval),
                      (dynamiteUpgradeInterval = null),
                      (unusedUpgradeFlag = false),
                      goldUpgradeDynamiteElement
                        .find('.notification')
                        .html(
                          '<div class="reward winUp' +
                            dynamiteUpgradeResult.big +
                            '"><div>Lvl. ' +
                            dynamiteUpgradeResult.gold_dynamite_level +
                            '</div><div><img src="/img/gold-bomb-' +
                            dynamiteUpgradeResult.gold_dynamite_level +
                            '.png?v=1"></div></div>'
                        ),
                      updateDynamiteUpgrade(dynamiteUpgradeResult.gold_dynamite_level),
                      $('.gold-ore-count').text(dynamiteUpgradeResult.gold_ores),
                      $('.gold-bar-count').text(dynamiteUpgradeResult.gold_bars),
                      (serverData.user.ppcoins = parseInt(dynamiteUpgradeResult.ppcoins)),
                      $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                        serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                      ),
                      $('.my-pp b').text(serverData.user.ppcoins),
                      $('#gold-rush .gold-dynamite-level').text(dynamiteUpgradeResult.gold_dynamite_level),
                      $('#gold-rush .img-gold-dynamite-current').attr(
                        'src',
                        '/img/gold-bomb-' + dynamiteUpgradeResult.gold_dynamite_level + '.png?v=1'
                      ),
                      setTimeout(
                        /**
                         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                         *
                         * Observed DOM operations: css, removeClass, html.
                         */
                        function () {
                          goldUpgradeDynamiteElement.find('.bar-progress .bar').css('width', '0%');
                          goldUpgradeDynamiteElement.find('.bar-progress .bar').removeClass('completed');
                          goldUpgradeDynamiteElement.find('.notification').html('');
                        },
                        4000
                      ),
                      (dynamiteUpgradeResult = null));
                  } else {
                    var barProgressBarDynamiteUpgradeMillisecondsRemaining =
                      100 - (dynamiteUpgradeMillisecondsRemaining / count) * 100;
                    goldUpgradeDynamiteElement
                      .find('.bar-progress .bar')
                      .css('width', barProgressBarDynamiteUpgradeMillisecondsRemaining + '%');
                  }
                },
                10
              );
            }
          }
        }
      );
      $(document).on('click', '.open-gold-rush-island, .open-gold-rush', function (event) {
        event.preventDefault();
        openGoldShop();
      });
      $(document).on('click', '.open-artist-island', function (event) {
        event.preventDefault();
        openArtistIsland();
      });
      $('#gold-rush .close-modal').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#gold-rush').hide();
        }
      );
      $('#gold-rush').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          $(event.target).attr('id') === 'gold-rush' && (event.preventDefault(), $('#gold-rush').hide());
        }
      );
      $('#coin-island').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if ($(event.target).attr('id') === 'coin-island') {
            event.preventDefault();
            $('#coin-island').hide();
          }
        }
      );
      $(document).on('click', '.btn-guild-requests', function (event) {
        event.preventDefault();
        openSocialPanel('guild-requests', true);
      });
      $('.btn-guild-list').on('click', function (event) {
        event.preventDefault();
        openSocialPanel('guild', true);
      });
      $('.btn-add-friend').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-friend.php.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var artRecipientRequest = {};
          artRecipientRequest.username = '';
          var requestData = artRecipientRequest,
            username = prompt('Enter the username of the player you wish to follow');
          username !== null &&
            ((requestData.username = username),
            api.xhr.req(
              'POST',
              '/api/post-friend.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-friend.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  $('#profile').hide();
                  canvasRenderer.loadFriends(true);
                  if (response.changed) {
                    showNotification('success', 'Player followed', 'Player added to your list');
                  }
                } else showNotification('error', 'Error', response.message);
              }
            ));
        }
      );
      var canvasResizeTimeout = null;
      $('.claim-coins').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-claim.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          canvasResizeTimeout !== null && clearTimeout(canvasResizeTimeout);
          var rewardClaimRequest = {};
          rewardClaimRequest.claim = $(this).attr('data-id');
          var requestData = rewardClaimRequest;
          api.xhr.req(
            'POST',
            '/api/post-claim.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/post-claim.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Shared/receiver state written: serverData.user.ppcoins, canvasResizeTimeout.
             *
             * Observed DOM operations: text.
             *
             * Scheduled work: setTimeout (3000 ms), setTimeout (30000 ms).
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                canvasRenderer.loadFreeCoins();
                serverData.user.ppcoins = parseInt(response.ppcoins);
                $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                  serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                );
                showNotification('success', 'Success!', 'Coins claimed!');
                canvasResizeTimeout = setTimeout(function () {
                  window.location.replace('/' + appState.page);
                }, 3000);
              } else {
                if (response.action !== undefined) {
                  if (response.action === 'sso') {
                    ui.openModal('main', 'account');
                  }
                  canvasResizeTimeout !== null &&
                    (canvasResizeTimeout = setTimeout(function () {
                      window.location.replace('/' + appState.page);
                    }, 30000));
                } else if (canvasResizeTimeout !== null) {
                  canvasResizeTimeout = setTimeout(function () {
                    window.location.replace('/' + appState.page);
                  }, 3000);
                }
                showNotification('error', 'Error', response.message);
              }
            }
          );
        }
      );
      $('.btn-add-block-data').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-friend.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var chatModerationRequest = {};
          chatModerationRequest.username = $(this).attr('data-username');
          chatModerationRequest.type = 1;
          var requestData = chatModerationRequest;
          api.xhr.req(
            'POST',
            '/api/post-friend.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/post-friend.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: hide.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                $('#profile').hide();
                canvasRenderer.loadBlocked();
                showNotification(
                  'success',
                  'User blocked',
                  "You won't see new messages or notifications from this player and he won't know if you blocked them or not"
                );
              } else {
                showNotification('error', 'Error', response.message);
              }
            }
          );
        }
      );
      $('.btn-add-blocked').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-friend.php.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var paintingModerationRequest = {};
          paintingModerationRequest.username = '';
          paintingModerationRequest.type = 1;
          var requestData = paintingModerationRequest,
            username = prompt('Enter username');
          if (username !== null) {
            requestData.username = username;
            api.xhr.req(
              'POST',
              '/api/post-friend.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-friend.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  $('#profile').hide();
                  canvasRenderer.loadBlocked();
                  showNotification(
                    'success',
                    'User blocked',
                    "You won't see new messages or notifications from this user and he won't know if you blocked them or not"
                  );
                } else showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.btn-del-guild-member',
        /**
         * Registered click callback delegated to ".btn-del-guild-member". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-guild-access.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var guildMemberRemovalRequest = {};
          guildMemberRemovalRequest.username = $(this).attr('data-username');
          guildMemberRemovalRequest.delete = 1;
          var requestData = guildMemberRemovalRequest,
            declineRequest = $(this).attr('data-extra') === 'denied' ? true : false,
            confirmationMessage = declineRequest
              ? 'Decline this request to join the guild?'
              : 'Remove this user from the guild?';
          if (confirm(confirmationMessage)) {
            api.xhr.req(
              'POST',
              '/api/post-guild-access.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-guild-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  $('#profile').hide();
                  declineRequest
                    ? (canvasRenderer.loadGuildMembersRequests(true),
                      showNotification('success', 'Success', 'Request declined'))
                    : (canvasRenderer.loadGuildMembers(true),
                      showNotification('success', 'Success', 'User removed from the guild'));
                } else showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.btn-add-guild-member',
        /**
         * Registered click callback delegated to ".btn-add-guild-member". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-guild-access.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var guildMemberApprovalRequest = {};
          guildMemberApprovalRequest.username = $(this).attr('data-username');
          guildMemberApprovalRequest.add = 1;
          var requestData = guildMemberApprovalRequest;
          if (confirm('Approve this user to join the guild?')) {
            api.xhr.req(
              'POST',
              '/api/post-guild-access.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-guild-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                success
                  ? ($('#profile').hide(),
                    canvasRenderer.loadGuildMembersRequests(true),
                    showNotification('success', 'Success', 'User approved'))
                  : showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.btn-del-friend',
        /**
         * Registered click callback delegated to ".btn-del-friend". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-friend.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (serverData.user.settings.chat.invisible) {
            showNotification(
              'error',
              'Social features',
              'Please disable Invisible mode in Chat settings to access social features'
            );
            ui.openModal('main', 'tools');
          } else {
            var friendRemovalRequest = {};
            friendRemovalRequest.username = $(this).attr('data-username');
            friendRemovalRequest.delete = 1;
            var requestData = friendRemovalRequest;
            api.xhr.req(
              'POST',
              '/api/post-friend.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-friend.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                success
                  ? ($('#profile').hide(),
                    canvasRenderer.loadFriends(true),
                    showNotification('success', 'Success', 'Player unfollowed'))
                  : showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.btn-del-blocked',
        /**
         * Registered click callback delegated to ".btn-del-blocked". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/post-friend.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var friendRemovalRequest = {};
          friendRemovalRequest.username = $(this).attr('data-username');
          friendRemovalRequest.delete = 1;
          friendRemovalRequest.type = 1;
          var requestData = friendRemovalRequest;
          api.xhr.req(
            'POST',
            '/api/post-friend.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/post-friend.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: hide.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              if (success) {
                $('#profile').hide();
                canvasRenderer.loadBlocked();
                showNotification('success', 'Success', 'User Unblocked');
              } else {
                showNotification('error', 'Error', response.message);
              }
            }
          );
        }
      );
      $(document).on(
        'click',
        '#dismiss-news',
        /**
         * Registered click callback delegated to "#dismiss-news". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#chat .snippet').hide();
          localStorage.setItem('last-news-dismiss', serverData.news.id);
        }
      );
      $(document).on(
        'click',
        '#read-news',
        /**
         * Registered click callback delegated to "#read-news". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('#chat .snippet').hide();
          localStorage.setItem('last-news-dismiss', serverData.news.id);
        }
      );
      $(document).on(
        'click',
        '.nsfw-continue',
        /**
         * Registered click callback delegated to ".nsfw-continue". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: ui.activeAlert.
         *
         * Observed DOM operations: removeClass.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          ui.activeAlert = false;
          $('canvas').removeClass('blur');
        }
      );
      ui.generateSettingsPaintingsPalettes();
      ui.elem.settings.painting.find('[name="title"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var inputValue = $(this).val();
          if (inputValue.length > 30) ui.triggerFormInputError('title', 'Title too long (max 30 characters)');
          else if (inputValue.length < 5) {
            ui.triggerFormInputError('title', 'Title too short (min 5 characters)');
          } else ui.triggerFormInputError('title', '');
        }
      );
      ui.elem.settings.painting.find('[name="description"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var inputValue = $(this).val();
          if (inputValue.length > 250) {
            ui.triggerFormInputError('description', 'Description too long (max 250 characters)');
          } else ui.triggerFormInputError('description', '');
        }
      );
      ui.elem.settings.painting.find('[name="rules"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var inputValue = $(this).val();
          inputValue.length > 1000
            ? ui.triggerFormInputError('rules', 'Rules too long (max 1000 characters)')
            : ui.triggerFormInputError('rules', '');
        }
      );
      ui.elem.settings.painting.find('[name="sizeX"], [name="sizeY"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var inputValue = parseInt(ui.elem.settings.painting.find('[name="sizeX"]').val()),
            int = parseInt(ui.elem.settings.painting.find('[name="sizeY"]').val());
          if (inputValue < 100 || int < 100) {
            ui.triggerFormInputError('size', 'Minimum size is 100 pixels');
          } else if (
            !serverData.user.premium.active &&
            (inputValue > appState.painting.width || int > appState.painting.height)
          ) {
            ui.elem.settings.painting.find('[name="sizeX"]').val(appState.painting.width);
            ui.elem.settings.painting.find('[name="sizeY"]').val(appState.painting.height);
            showNotification(
              'error',
              'You need to be a Premium Subscriber to pout more than 300 pixels. (Maximum 3000 x 3000 pixels for Premium)'
            );
          } else if (inputValue > 3000 || int > 3000)
            ui.triggerFormInputError('size', 'Maximum size is 3000 pixels');
          else {
            ui.triggerFormInputError('size', '');
          }
        }
      );
      ui.elem.settings.painting.find('[name="cooldown"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var inputValue = parseInt($(this).val());
          if (inputValue > 3600) ui.triggerFormInputError('cooldown', 'Maximum cooldown is 3600 (1 hour)');
          else
            inputValue < 0
              ? ui.triggerFormInputError('cooldown', 'Minimum cooldown is 0 (disabled)')
              : ui.triggerFormInputError('cooldown', '');
        }
      );
      ui.elem.settings.painting.find('[name="autoAcceptTime"]').on(
        'input',
        /**
         * Registered input callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          var inputValue = parseInt($(this).val());
          if (serverData.user.premium.active) {
            if (inputValue > 60)
              ui.triggerFormInputError('autoAcceptTime', 'Maximum auto accept time is 60 minutes');
            else if (inputValue < 0) {
              ui.triggerFormInputError('autoAcceptTime', 'Minimum auto accept time is 0 (disabled)');
            }
          } else
            inputValue !== appState.painting.autoAcceptTime
              ? ($(this).val(appState.painting.cooldown),
                showNotification('error', 'You need to be a Premium Subscriber to modify this setting.'))
              : ui.triggerFormInputError('autoAcceptTime', '');
        }
      );
      ui.elem.settings.painting.find('a[data-name="template"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, val, removeClass, addClass.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var inputValue = parseInt($(this).attr('data-id'));
          if (ui.selectors.extra !== 'create') {
            showNotification('error', 'This setting can only be set on painting creation');
          } else if (serverData.user.premium.active) {
            parseInt($(this).attr('data-id')) > 0 &&
              (ui.elem.settings.painting.find('input[name="sizeX"]').val($(this).attr('data-x')),
              ui.elem.settings.painting.find('input[name="sizeY"]').val($(this).attr('data-y')),
              alert(
                'The recommended size for this template has been applied to your painting settings (' +
                  $(this).attr('data-x') +
                  ' x ' +
                  $(this).attr('data-y') +
                  ' pixels)'
              ));
            ui.elem.settings.painting.find('a[data-name="template"]').removeClass('selected');
            ui.elem.settings.painting.find('[name="template"]').val(inputValue);
            $(this).addClass('selected');
          } else if (inputValue !== appState.painting.cooldown) {
            showNotification('error', 'You need to be a Premium Subscriber to modify this setting.');
          } else {
            ui.triggerFormInputError('cooldown', '');
          }
        }
      );
      ui.elem.settings.painting.find('.input-radio[data-name="access"]').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          ui.settingsPaintingSelectAccess($(this), false, 1);
        }
      );
      ui.elem.settings.painting.find('.settings-painting-palette[data-name="background"] > div > a').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          ui.settingsPaintingSelectBackground($(this));
        }
      );
      ui.elem.settings.painting.find('.settings-painting-palette[data-name="allowedColors"] > div > a').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: removeClass, addClass, val.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var element = $(this);
          if (serverData.user.premium.active) {
            element.parent().hasClass('selected')
              ? element.parent().removeClass('selected')
              : element.parent().addClass('selected');
            var entries = [];
            $(document)
              .find(
                '#form-settings-painting .settings-painting-palette[data-name="allowedColors"] > div.selected > a'
              )
              .each(
                /**
                 * Observed DOM operations: attr.
                 *
                 * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
                 */
                function () {
                  entries.push(parseInt($(this).attr('data-value')));
                }
              );
            ui.elem.settings.painting
              .find('input[type="hidden"][name="allowedColors"]')
              .val(entries.join(','));
          } else showNotification('error', 'You need to be a Premium Subscriber to modify this setting.');
        }
      );
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
        document.body.style.zoom = 1;
      });
      document.addEventListener('gesturechange', function (event) {
        event.preventDefault();
        document.body.style.zoom = 1;
      });
      document.addEventListener('gestureend', function (event) {
        event.preventDefault();
        document.body.style.zoom = 1;
      });
      /**
       * Synchronize page/canvas presentation with current viewport dimensions. The force flag bypasses the original dimension-change test. It does not change the painting pixel dimensions configured by the server.
       *
       * Shared/receiver state written: elements.loader[computed].style.height, elements.loader[computed].style.width, elements.container[computed].style.height, elements.container[computed].style.width, elements.modals[computed].style.height, elements.modals[computed].style.width, canvasRenderer.element.painting[computed].style.height, canvasRenderer.element.painting[computed].style.width.
       *
       * Observed DOM operations: elements.copyright.hide, elements.copyright.show, hide, show.
       *
       * Input bindings: force. Names describe inferred roles; protocol field names are preserved separately.
       */
      function resizeViewport(force) {
        (force ||
          parseInt(elements.container[0].style.height) != window.innerHeight ||
          parseInt(elements.container[0].style.width) != window.innerWidth) &&
          ((elements.loader[0].style.height = window.innerHeight + 'px'),
          (elements.loader[0].style.width = window.innerWidth + 'px'),
          (elements.container[0].style.height = window.innerHeight + 'px'),
          (elements.container[0].style.width = window.innerWidth + 'px'),
          (elements.modals[0].style.height = window.innerHeight + 'px'),
          (elements.modals[0].style.width = window.innerWidth + 'px'),
          (canvasRenderer.element.painting[0].style.height = window.innerHeight + 'px'),
          (canvasRenderer.element.painting[0].style.width = window.innerWidth + 'px'),
          ($('#palette-buttons')[0].style.height = window.innerHeight + 'px'),
          (document.body.style.height = window.innerHeight + 'px'),
          parseInt(elements.container[0].style.width) <= 677
            ? elements.copyright.hide()
            : elements.copyright.show(),
          window.innerWidth <= 430 ? $('#painting-list').hide() : $('#painting-list').show(),
          updatePaletteScrollButtons());
      }
      setInterval(function () {
        resizeViewport();
      }, 500);
      function updatePaletteScrollButtons() {
        if (
          parseInt($('#palette-buttons')[0].scrollTop) + parseInt($('#palette-buttons')[0].style.height) >=
          parseInt($('#palette-buttons')[0].scrollHeight)
        ) {
          elements.paletteButtonUp[0].style.display = 'block';
          elements.paletteButtonDown[0].style.display = 'none';
        } else elements.paletteButtonDown[0].style.display = 'block';
        if ($('#palette-buttons')[0].scrollTop < 0) {
          elements.paletteButtonDown[0].style.display = 'block';
          elements.paletteButtonUp[0].style.display = 'none';
        } else if ($('#palette-buttons')[0].scrollTop > 0)
          elements.paletteButtonUp[0].style.display = 'block';
        else {
          elements.paletteButtonUp[0].style.display = 'none';
        }
      }
      updatePaletteScrollButtons();
      setTimeout(
        /**
         * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
         *
         * Shared/receiver state written: elements.paletteButtonDown[computed].style.display.
         */
        function () {
          elements.paletteButtonDown[0].style.display = 'block';
        },
        100
      );
      $('#palette-buttons')[0].addEventListener('scroll', function () {
        updatePaletteScrollButtons();
      });
      elements.paletteButtonUp[0].addEventListener('click', function (event) {
        event.preventDefault();
        $('#palette-buttons')[0].scrollTop -= 80;
      });
      elements.paletteButtonDown[0].addEventListener('click', function (event) {
        event.preventDefault();
        $('#palette-buttons')[0].scrollTop += 80;
      });
      canvasRenderer.haveZoomRendering = false;
      var userAgent = navigator.userAgent,
        isAppleMobileWebKit = userAgent.match(/(iPod|iPhone|iPad)/i) && userAgent.match(/AppleWebKit/i),
        isSafari = userAgent.match(/safari/i) && !userAgent.match(/chrome/i),
        isEdge = $.inArray('Edge', userAgent) > -1;
      if (isAppleMobileWebKit) {
        var iosVersion =
          parseFloat(
            (
              '' +
              (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [
                0,
                ''
              ])[1]
            )
              .replace('undefined', '3_2')
              .replace('_', '.')
              .replace('_', '')
          ) || false;
        iosVersion >= 11 && (canvasRenderer.haveZoomRendering = true);
      } else if (isSafari) {
        canvasRenderer.haveZoomRendering = true;
      }
      /* Format a duration in seconds using the original day/hour/minute boundary rules. */
      function formatDuration(seconds, includeSeconds) {
        var text = '';
        if (seconds > 86400) {
          var mathFloor = Math.floor(seconds / 86400);
          text += mathFloor + 'd';
          seconds -= mathFloor * 86400;
        }
        if (seconds > 3600) {
          text.length && (text += ', ');
          var mathFloor = Math.floor(seconds / 3600);
          text += mathFloor + 'h';
          seconds -= mathFloor * 3600;
        }
        if (seconds > 60) {
          text.length && (text += ', ');
          var mathFloorSeconds = Math.floor(seconds / 60);
          text += mathFloorSeconds + 'm';
          seconds -= mathFloorSeconds * 60;
        }
        if (text === '') seconds > 0 && (text += seconds + 's');
        else if (includeSeconds) {
          if (text.length) {
            text += ', ';
          }
          text += seconds + 's';
        }
        return text;
      }
      function formatElapsedTime(dateOrSeconds, includeSeconds) {
        var date = null,
          timeSuffix = null;
        dateOrSeconds instanceof Date
          ? ((date = Math.floor((new Date() - dateOrSeconds) / 1000)),
            date < 0 ? (timeSuffix = ' ') : (timeSuffix = ' '),
            (date = Math.abs(date)))
          : ((date = dateOrSeconds), (timeSuffix = ''));
        const items = [
          [31536000, 'year'],
          [2592000, 'month'],
          [86400, 'day'],
          [3600, 'hour'],
          [60, 'minute'],
          [1, 'second']
        ];
        var remainingSeconds = date,
          entries = [];
        for (var index = 0; index < items.length; index++) {
          if (index === 3) {
            break;
          }
          var mathFloor = Math.floor(remainingSeconds / items[index][0]);
          if (mathFloor > 0) {
            entries.push(mathFloor + ' ' + items[index][1] + (mathFloor > 1 ? 's' : ''));
            remainingSeconds = remainingSeconds % items[index][0];
          }
        }
        var durationText = entries.join(', '),
          formattedTime = durationText + timeSuffix;
        return (
          (formattedTime === '' || formattedTime === ' ') && (formattedTime = 'less than a day'),
          formattedTime
        );
      }
      function formatElapsedTimeLong(dateOrSeconds) {
        {
          var date = null,
            timeSuffix = null;
          if (dateOrSeconds instanceof Date) {
            date = Math.floor((new Date() - dateOrSeconds) / 1000);
            date < 0 ? (timeSuffix = ' ') : (timeSuffix = ' ');
            date = Math.abs(date);
          } else {
            date = dateOrSeconds;
            timeSuffix = '';
          }
          const items = [
            [31536000, 'year'],
            [2592000, 'month'],
            [86400, 'day'],
            [3600, 'hour'],
            [60, 'minute'],
            [1, 'second']
          ];
          var remainingSeconds = date,
            entries = [];
          for (var index = 0; index < items.length; index++) {
            if (index > 4) break;
            var mathFloor = Math.floor(remainingSeconds / items[index][0]);
            if (mathFloor > 0) {
              entries.push(mathFloor + ' ' + items[index][1] + (mathFloor > 1 ? 's' : ''));
              remainingSeconds = remainingSeconds % items[index][0];
            }
          }
          var durationText = entries.join(', '),
            formattedTime = durationText + timeSuffix;
          return (
            (formattedTime === '' || formattedTime === ' ') && (formattedTime = 'less than a minute'),
            formattedTime
          );
        }
      }
      function isTouchDevice() {
        var parts = ' -webkit- -moz- -o- -ms- '.split(' '),
          callback = function (mediaQuery) {
            return window.matchMedia(mediaQuery).matches;
          };
        if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch))
          return true;
        var touchMediaQuery = ['(', parts.join('touch-enabled),('), 'heartz', ')'].join('');
        return callback(touchMediaQuery);
      }
      if (isTouchDevice()) {
        pointer.touchDevice = true;
        if (!alternativeMobileDrawing) {
          serverData.painting.cooldown > 0
            ? ($('#mobileplace a.mobile-place').find('span').text('Place pixel?'),
              $('#mobileplace a.mobile-place').find('div').hide())
            : ($('#mobileplace a.mobile-place').find('span').text('Activate Brush?'),
              $('#mobileplace a.mobile-place').find('div').show());
          $('#mobileplace').show();
        }
      } else $('.input-checkbox[data-name="tools-mobile-alt"]').hide();
      $(document).on('click', '#mobileplace .mobile-alt', function () {
        ui.openModal('main', 'tools');
      });
      function byteToHex(byte) {
        var hex = byte.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
      }
      function rgbToHex(red, green, blue) {
        return '#' + (byteToHex(red) + byteToHex(green) + byteToHex(blue)).toUpperCase();
      }
      function hexToRgb(hexColor) {
        var rgbMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return rgbMatch
          ? [parseInt(rgbMatch[1], 16), parseInt(rgbMatch[2], 16), parseInt(rgbMatch[3], 16)]
          : null;
      }
      /**
       * Normalize coordinates across the original mouse/touch event shapes. The fallback order matters because page, client and changed-touch coordinates can coexist on wrapped jQuery events. The function preserves the original object/result behavior rather than creating a new event abstraction.
       *
       * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
       */
      /* Recover page coordinates from mouse or touch events, preserving the original coordinate fallback order. */
      function normalizePointerEvent(event) {
        if (event.pageX === undefined || event.pageY === undefined) {
          if (event.clientX === undefined || event.clientY === undefined) {
            if (
              event.originalEvent.changedTouches[0].clientX === undefined ||
              event.originalEvent.changedTouches[0].clientY === undefined
            )
              alert('Browser not supported, please use Chrome (recommended), Safari or Firefox');
            else {
              event.pageX = event.originalEvent.changedTouches[0].clientX;
              event.pageY = event.originalEvent.changedTouches[0].clientY;
            }
          } else {
            event.pageX = event.clientX;
            event.pageY = event.clientY;
          }
        }
        return event;
      }
      canvasRenderer.loadPainting();
      canvasRenderer.loadChat();
      $(document).on(
        'click',
        '.access-approve-player',
        /**
         * Registered click callback delegated to ".access-approve-player". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-painting-access.php.
         */
        function () {
          var username = prompt('Enter player username to pre-approve');
          if (username) {
            var accessApprovalRequest = {};
            accessApprovalRequest.requestId = -2;
            accessApprovalRequest.username = username;
            accessApprovalRequest.requestAnswer = 1;
            accessApprovalRequest.painting = serverData.painting.id;
            var requestData = accessApprovalRequest;
            if (requestData.requestAnswer === 2) {
              var rejectReason = prompt('Decline reason (optional)');
              if (rejectReason !== null) {
                requestData.rejectReason = rejectReason;
              }
            }
            api.xhr.req(
              'POST',
              '/api/get-painting-access.php',
              requestData,
              true,
              function (success, response) {
                success
                  ? canvasRenderer.fetchPaintingAccess(1, 0)
                  : showNotification('error', 'Error', response.message);
              }
            );
          }
        }
      );
      $(document).on(
        'click',
        '.access-decline-player',
        /**
         * Registered click callback delegated to ".access-decline-player". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-painting-access.php.
         */
        function () {
          var username = prompt('Enter player username to blacklist');
          if (username) {
            var accessDenialRequest = {};
            accessDenialRequest.requestId = -2;
            accessDenialRequest.username = username;
            accessDenialRequest.requestAnswer = 2;
            accessDenialRequest.painting = serverData.painting.id;
            var requestData = accessDenialRequest;
            if (requestData.requestAnswer === 2) {
              var rejectReason = prompt('Decline reason (optional)');
              rejectReason !== null && (requestData.rejectReason = rejectReason);
            }
            api.xhr.req(
              'POST',
              '/api/get-painting-access.php',
              requestData,
              true,
              function (success, response) {
                if (success) canvasRenderer.fetchPaintingAccess(2, 0);
                else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          }
        }
      );
      canvasRenderer.pSave = 3;
      $(document).on(
        'click',
        '.request-row .actions a',
        /**
         * Registered click callback delegated to ".request-row .actions a". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: POST /api/get-painting-access.php.
         *
         * Observed DOM operations: attr.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var requestRowElement = $(this).closest('.request-row');
          if (parseInt($(this).attr('data-type')) === 10) {
            var moderatorRemovalRequest = {};
            moderatorRemovalRequest.manageModerator = true;
            moderatorRemovalRequest.username = $(this).attr('data-id');
            moderatorRemovalRequest.painting = serverData.painting.id;
            moderatorRemovalRequest.way = 0;
            var requestData = moderatorRemovalRequest;
            ui.triggerLoader(true);
            api.xhr.req(
              'POST',
              '/api/get-painting-access.php',
              requestData,
              true,
              function (success, response) {
                ui.triggerLoader(false);
                success
                  ? (canvasRenderer.fetchPaintingModerators(),
                    showNotification('success', 'Success', 'Moderator removed'))
                  : showNotification('error', 'Error', response.message);
              }
            );
          } else {
            var accessAnswerRequest = {};
            accessAnswerRequest.requestId = parseInt($(this).attr('data-id'));
            accessAnswerRequest.requestAnswer = parseInt($(this).attr('data-type'));
            accessAnswerRequest.painting = serverData.painting.id;
            var requestData = accessAnswerRequest;
            if (requestData.requestAnswer === 2) {
              var rejectReason = prompt('Decline reason (optional)');
              rejectReason !== null && (requestData.rejectReason = rejectReason);
            }
            if ($(this).hasClass('banTime')) {
              var banTime = prompt('Enter the number of days the user should be banned from the painting');
              if (banTime) {
                requestData.banTime = banTime;
              }
            }
            ((requestData.requestAnswer === 2 && rejectReason !== null) ||
              requestData.requestAnswer !== 2 ||
              ($(this).hasClass('banTime') && banTime !== null)) &&
              api.xhr.req(
                'POST',
                '/api/get-painting-access.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Observed DOM operations: requestRowElement.remove.
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  success ? requestRowElement.remove() : showNotification('error', 'Error', response.message);
                }
              );
          }
        }
      );
      $('.submit-button').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, Cookies.remove.
         *
         * Scheduled work: setTimeout (5000 ms).
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var id = $(this).attr('data-id');
          if (id === 'logout') {
            var cookieOptions = {};
            cookieOptions.path = '';
            Cookies.remove('authId', cookieOptions);
            var authIdCookieOptions = {};
            authIdCookieOptions.path = '';
            Cookies.remove('authKey', authIdCookieOptions);
            var authKeyCookieOptions = {};
            authKeyCookieOptions.path = '';
            Cookies.remove('authToken', authKeyCookieOptions);
            window.location.reload();
            setTimeout(function () {
              showNotification('success', 'Success!', 'You are now disconnected, please refresh the page');
            }, 5000);
          } else if (id === 'download-painting') {
            {
              const downloadLink = document.createElement('a');
              canvasRenderer.element.canvas.painting[0].toBlob(function (blob) {
                downloadLink.href = URL.createObjectURL(blob);
                var date = new Date();
                downloadLink.download =
                  serverData.painting.id + '-' + serverData.painting.slug + '-' + date.valueOf() + '.png';
                downloadLink.click();
              }, 'image/png');
            }
          }
        }
      );
      $('.submit-form').on(
        'click',
        /**
         * Registered click callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: attr, addClass, text, html.
         *
         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          var id = $(this).closest('form').attr('id'),
            enabled = true;
          if (
            id === 'form-account-username' ||
            id === 'form-painting-load-more-requests-pending' ||
            id === 'form-painting-load-more-requests-accepted' ||
            id === 'form-painting-load-more-requests-declined' ||
            id === 'form-painting-approve-all-requests' ||
            id === 'form-painting-request-access' ||
            id === 'form-painting-moderator-add' ||
            id === 'form-painting-load-more-list' ||
            id === 'form-guilds-load-more' ||
            id === 'form-painting-delete' ||
            id === 'form-guild-delete' ||
            id === 'form-settings-painting' ||
            id === 'form-attack-coinisland' ||
            id === 'form-claim-coinisland-coins' ||
            id === 'form-painting-request-access-guild' ||
            id === 'form-painting-request-access-twitch' ||
            id === 'form-account-login' ||
            id === 'form-guild-store' ||
            id === 'form-guild-transfer'
          ) {
            enabled = false;
          }
          $(this).addClass('spin');
          $(this).attr('data-text', $(this).text());
          $(this).html('<img src="/img/icons/spin.svg" width="14">');
          $(this).attr('disabled', 'true');
          runCaptchaAction(id, enabled);
        }
      );
      /**
       * Dispatch the selected form/action directly or defer it through the existing CAPTCHA flow according to the supplied flag. The action identifier maps to a stored callback, and completion uses the original token/data arguments.
       *
       * Input bindings: argument, requiresCaptcha. Names describe inferred roles; protocol field names are preserved separately.
       */
      function runCaptchaAction(argument, requiresCaptcha) {
        if (requiresCaptcha) requestCaptcha(argument);
        else {
          captchaActions[argument]();
        }
      }
      var pendingCaptchaAction = null;
      /**
       * Record the pending action and open the CAPTCHA UI only under the original pending-state guard. The action is resumed by a separate completion handler; opening the UI alone is not completion.
       *
       * Shared/receiver state written: pendingCaptchaAction.
       *
       * Input bindings: action. Names describe inferred roles; protocol field names are preserved separately.
       */
      function requestCaptcha(action) {
        pendingCaptchaAction === null &&
          ((pendingCaptchaAction = action), ui.openModal('captcha', 'captcha'));
      }
      VALIDATE_CAPTCHA = function (captchaToken) {
        pendingCaptchaAction !== null &&
          (captchaActions[pendingCaptchaAction](captchaToken), (pendingCaptchaAction = null));
      };
      var formActions = {};
      /**
       * Direct network calls: POST /api/login.php.
       *
       * Observed DOM operations: val, attr.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-account-login'] = function (gRecaptchaResponse) {
        var formAccountLoginElement = $('#form-account-login'),
          loginFields = {};
        loginFields.email = formAccountLoginElement.find('[name="email"]').val();
        loginFields.password = formAccountLoginElement.find('[name="password"]').val();
        loginFields.captchaCF = formAccountLoginElement.find('#recaptchaCFLogin').attr('data-challenge');
        var requestData = loginFields;
        turnstile.reset('#recaptchaCFLogin');
        gRecaptchaResponse !== undefined && (requestData['g-recaptcha-response'] = gRecaptchaResponse);
        grecaptcha.reset();
        gRecaptchaResponse !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/login.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/login.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Scheduled work: setTimeout (5000 ms).
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formAccountLoginElement
              .find('.submit-form')
              .text(formAccountLoginElement.find('.submit-form').attr('data-text'));
            formAccountLoginElement.find('.submit-form').removeAttr('disabled');
            formAccountLoginElement.find('.submit-form').removeClass('spin');
            if (success) {
              var enabled = false,
                hash = window.location.hash;
              if (hash != '') {
                var parts = hash.split('=');
                parts[1] !== undefined &&
                  parts[0] === '#auth' &&
                  (window.location.replace('/forums/'), (enabled = true));
              }
              !enabled && window.location.reload();
              setTimeout(function () {
                showNotification('success', 'Success!', 'You are now connected, please refresh the page');
              }, 5000);
            } else showNotification('error', 'Error', response.message);
          }
        );
      };
      /**
       * Direct network calls: POST /api/register.php.
       *
       * Observed DOM operations: val, attr.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-account-register'] = function (gRecaptchaResponse) {
        var formAccountRegisterElement = $('#form-account-register'),
          registrationFields = {};
        registrationFields.email = formAccountRegisterElement.find('[name="email"]').val();
        registrationFields.password = formAccountRegisterElement.find('[name="password"]').val();
        registrationFields.confirm = formAccountRegisterElement.find('[name="password-confirm"]').val();
        registrationFields.captchaCF = formAccountRegisterElement.find('#recaptchaCF').attr('data-challenge');
        var requestData = registrationFields;
        if (gRecaptchaResponse !== undefined) {
          requestData['g-recaptcha-response'] = gRecaptchaResponse;
        }
        grecaptcha.reset();
        turnstile.reset('#recaptchaCF');
        if (gRecaptchaResponse !== undefined) {
          ui.goBackFromCaptcha();
        }
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/register.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/register.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass, val.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formAccountRegisterElement
              .find('.submit-form')
              .text(formAccountRegisterElement.find('.submit-form').attr('data-text'));
            formAccountRegisterElement.find('.submit-form').removeAttr('disabled');
            formAccountRegisterElement.find('.submit-form').removeClass('spin');
            if (success) {
              formAccountRegisterElement.find('input').val('');
              ui.openModal('auth', 'login');
              $('#form-account-login').find('[name="email"]').val(requestData.email);
              $('#form-account-login').find('[name="password"]').val(requestData.password);
              alert('Account created, please check your e-mail and click on the activation link');
              showNotification(
                'success',
                'Account created',
                'Please check your e-mail and click on the activation link'
              );
            } else showNotification('error', 'Error', response.message);
          }
        );
      };
      formActions['form-delete-account'] = function (gRecaptchaResponse) {
        var formDeleteAccountElement = $('#form-delete-account'),
          accountDeletionFields = {};
        accountDeletionFields.deleteAcc = 1;
        var requestData = accountDeletionFields;
        if (gRecaptchaResponse !== undefined) {
          requestData['g-recaptcha-response'] = gRecaptchaResponse;
        }
        grecaptcha.reset();
        gRecaptchaResponse !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/post-delete.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/post-delete.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass, val, Cookies.remove.
           *
           * Scheduled work: setTimeout (5000 ms).
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formDeleteAccountElement
              .find('.submit-form')
              .text(formDeleteAccountElement.find('.submit-form').attr('data-text'));
            formDeleteAccountElement.find('.submit-form').removeAttr('disabled');
            formDeleteAccountElement.find('.submit-form').removeClass('spin');
            if (success) {
              formDeleteAccountElement.find('input').val('');
              var cookieOptions = {};
              cookieOptions.path = '';
              Cookies.remove('authId', cookieOptions);
              var authTokenCookieOptions = {};
              authTokenCookieOptions.path = '';
              Cookies.remove('authKey', authTokenCookieOptions);
              var authSessionCookieOptions = {};
              authSessionCookieOptions.path = '';
              Cookies.remove('authToken', authSessionCookieOptions);
              ui.closeModal();
              showNotification(
                'success',
                'Account data removal requested',
                'Your account data will be removed in 14 days unless you login on it again'
              );
              setTimeout(function () {
                window.location.reload();
              }, 5000);
            } else showNotification('error', 'Error', response.message);
          }
        );
      };
      /**
       * Direct network calls: POST /api/forgot.php.
       *
       * Observed DOM operations: val.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-account-forgot'] = function (gRecaptchaResponse) {
        var formAccountForgotElement = $('#form-account-forgot'),
          passwordResetFields = {};
        passwordResetFields.email = formAccountForgotElement.find('[name="email"]').val();
        var requestData = passwordResetFields;
        gRecaptchaResponse !== undefined && (requestData['g-recaptcha-response'] = gRecaptchaResponse);
        grecaptcha.reset();
        if (gRecaptchaResponse !== undefined) {
          ui.goBackFromCaptcha();
        }
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/forgot.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/forgot.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formAccountForgotElement
              .find('.submit-form')
              .text(formAccountForgotElement.find('.submit-form').attr('data-text'));
            formAccountForgotElement.find('.submit-form').removeAttr('disabled');
            formAccountForgotElement.find('.submit-form').removeClass('spin');
            success
              ? (ui.openModal('auth', 'login'),
                alert('Request sent, please check your e-mail and click on the activation link'),
                showNotification(
                  'success',
                  'Request sent',
                  'Please check your e-mail and click on the activation link'
                ))
              : showNotification('error', 'Error', response.message);
          }
        );
      };
      /**
       * Direct network calls: POST /api/forgot-activation.php.
       *
       * Observed DOM operations: val.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-account-forgot-activation'] = function (gRecaptchaResponse) {
        var activationForm = $('#form-account-forgot-activation'),
          newPasswordFields = {};
        newPasswordFields.forgotKey = '';
        newPasswordFields.password = activationForm.find('[name="password"]').val();
        newPasswordFields.confirm = activationForm.find('[name="password-confirm"]').val();
        var requestData = newPasswordFields,
          parts = window.location.href.split('?forgotKey=');
        requestData.forgotKey = parts[1];
        gRecaptchaResponse !== undefined && (requestData['g-recaptcha-response'] = gRecaptchaResponse);
        grecaptcha.reset();
        if (gRecaptchaResponse !== undefined) {
          ui.goBackFromCaptcha();
        }
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/forgot-activation.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/forgot-activation.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Scheduled work: setTimeout (3000 ms).
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            activationForm.find('.submit-form').text(activationForm.find('.submit-form').attr('data-text'));
            activationForm.find('.submit-form').removeAttr('disabled');
            activationForm.find('.submit-form').removeClass('spin');
            if (success) {
              showNotification('success', 'Password set successfully! Please log in to your account');
              setTimeout(function () {
                window.location.replace('/' + appState.page);
              }, 3000);
            } else {
              showNotification('error', 'Error', response.message);
            }
          }
        );
      };
      /**
       * Direct network calls: POST /api/account-password.php.
       *
       * Observed DOM operations: val.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-account-change-password'] = function (gRecaptchaResponse) {
        var passwordChangeForm = $('#form-account-change-password'),
          passwordChangeFields = {};
        passwordChangeFields.current = passwordChangeForm.find('[name="password-current"]').val();
        passwordChangeFields.password = passwordChangeForm.find('[name="password"]').val();
        passwordChangeFields.confirm = passwordChangeForm.find('[name="password-confirm"]').val();
        var requestData = passwordChangeFields;
        gRecaptchaResponse !== undefined && (requestData['g-recaptcha-response'] = gRecaptchaResponse);
        grecaptcha.reset();
        if (gRecaptchaResponse !== undefined) {
          ui.goBackFromCaptcha();
        }
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/account-password.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/account-password.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass, val.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            passwordChangeForm
              .find('.submit-form')
              .text(passwordChangeForm.find('.submit-form').attr('data-text'));
            passwordChangeForm.find('.submit-form').removeAttr('disabled');
            passwordChangeForm.find('.submit-form').removeClass('spin');
            success
              ? (passwordChangeForm.find('input').val(''),
                showNotification('success', 'Success', 'Password updated'))
              : showNotification('error', 'Error', response.message);
          }
        );
      };
      /**
       * Direct network calls: POST /api/account-username.php.
       *
       * Observed DOM operations: val.
       *
       * Input bindings: captchaToken. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-account-username'] = function (captchaToken) {
        var formAccountUsernameElement = $('#form-account-username'),
          usernameFields = {};
        usernameFields.username = formAccountUsernameElement.find('[name="username"]').val();
        var requestData = usernameFields;
        captchaToken !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/account-username.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/account-username.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Scheduled work: setTimeout (5000 ms).
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formAccountUsernameElement
              .find('.submit-form')
              .text(formAccountUsernameElement.find('.submit-form').attr('data-text'));
            formAccountUsernameElement.find('.submit-form').removeAttr('disabled');
            formAccountUsernameElement.find('.submit-form').removeClass('spin');
            if (success) {
              window.location.reload();
              setTimeout(function () {
                showNotification('success', 'Success!', 'Username created, please refresh the page');
              }, 5000);
            } else {
              showNotification('error', 'Error', response.message);
            }
          }
        );
      };
      formActions['form-painting-load-more-requests-pending'] = function (unusedEvent) {
        canvasRenderer.lastStartAccessFetch += 20;
        canvasRenderer.fetchPaintingAccess(0, canvasRenderer.lastStartAccessFetch);
      };
      formActions['form-painting-load-more-requests-accepted'] = function (unusedEvent) {
        canvasRenderer.lastStartAccessFetch += 20;
        canvasRenderer.fetchPaintingAccess(1, canvasRenderer.lastStartAccessFetch);
      };
      formActions['form-painting-load-more-requests-declined'] = function (unusedEvent) {
        canvasRenderer.lastStartAccessFetch += 20;
        canvasRenderer.fetchPaintingAccess(2, canvasRenderer.lastStartAccessFetch);
      };
      /**
       * Direct network calls: POST /api/get-painting-access.php.
       *
       * Observed DOM operations: text, attr, removeClass.
       *
       * Input bindings: captchaToken. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-painting-approve-all-requests'] = function (captchaToken) {
        var approveAllForm = $('#form-painting-approve-all-requests'),
          approveAllFields = {};
        approveAllFields.requestId = -1;
        approveAllFields.requestAnswer = 1;
        approveAllFields.painting = serverData.painting.id;
        var requestData = approveAllFields;
        if (captchaToken !== undefined) {
          ui.goBackFromCaptcha();
        }
        ui.triggerLoader(true);
        if (confirm('Approve all pending requests?')) {
          api.xhr.req(
            'POST',
            '/api/get-painting-access.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: text, attr, removeClass.
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              ui.triggerLoader(false);
              approveAllForm.find('.submit-form').text(approveAllForm.find('.submit-form').attr('data-text'));
              approveAllForm.find('.submit-form').removeAttr('disabled');
              approveAllForm.find('.submit-form').removeClass('spin');
              if (success) {
                canvasRenderer.fetchPaintingAccess(0, 0);
                showNotification('success', 'Success', 'Pending requests approved');
              } else showNotification('error', 'Error', response.message);
            }
          );
        } else {
          ui.triggerLoader(false);
          approveAllForm.find('.submit-form').text(approveAllForm.find('.submit-form').attr('data-text'));
          approveAllForm.find('.submit-form').removeAttr('disabled');
          approveAllForm.find('.submit-form').removeClass('spin');
        }
      };
      /**
       * Direct network calls: POST /api/get-painting-access.php.
       *
       * Observed DOM operations: val.
       *
       * Input bindings: captchaToken. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-painting-request-access'] = function (captchaToken) {
        var accessRequestForm = $('#form-painting-request-access'),
          messageData = {};
        messageData.createRequest = true;
        messageData.message = accessRequestForm.find('textarea[name="message"]').val();
        messageData.painting = serverData.painting.id;
        var requestData = messageData;
        captchaToken !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/get-painting-access.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            accessRequestForm
              .find('.submit-form')
              .text(accessRequestForm.find('.submit-form').attr('data-text'));
            accessRequestForm.find('.submit-form').removeAttr('disabled');
            accessRequestForm.find('.submit-form').removeClass('spin');
            if (success) {
              ui.closeModal();
              response.auto_accepted !== undefined
                ? showNotification('success', 'Success', 'Access Granted')
                : showNotification(
                    'success',
                    'Success',
                    'Request sent, please wait until you get approved by the owner or the moderators'
                  );
            } else {
              if (response.action !== undefined) {
                if (response.action === 'sso') {
                  ui.openModal('main', 'account');
                }
              }
              showNotification('error', 'Error', response.message);
            }
          }
        );
      };
      formActions['form-painting-request-access-guild'] = function (gRecaptchaResponse) {
        var guildAccessForm = $('#form-painting-request-access-guild'),
          guildAccessFields = {};
        guildAccessFields.createGuildRequest = true;
        guildAccessFields.painting = serverData.painting.id;
        var requestData = guildAccessFields;
        if (gRecaptchaResponse !== undefined) {
          requestData['g-recaptcha-response'] = gRecaptchaResponse;
        }
        grecaptcha.reset();
        gRecaptchaResponse !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/get-painting-access.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            guildAccessForm.find('.submit-form').text(guildAccessForm.find('.submit-form').attr('data-text'));
            guildAccessForm.find('.submit-form').removeAttr('disabled');
            guildAccessForm.find('.submit-form').removeClass('spin');
            if (success) {
              ui.closeModal();
              showNotification('success', 'Success', 'Access granted!');
            } else {
              showNotification('error', 'Error', response.message);
            }
          }
        );
      };
      formActions['form-painting-request-access-twitch'] = function (gRecaptchaResponse) {
        var twitchAccessForm = $('#form-painting-request-access-twitch'),
          twitchAccessFields = {};
        twitchAccessFields.createTwitchRequest = true;
        twitchAccessFields.painting = serverData.painting.id;
        var requestData = twitchAccessFields;
        if (gRecaptchaResponse !== undefined) {
          requestData['g-recaptcha-response'] = gRecaptchaResponse;
        }
        grecaptcha.reset();
        gRecaptchaResponse !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/get-painting-access.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            twitchAccessForm
              .find('.submit-form')
              .text(twitchAccessForm.find('.submit-form').attr('data-text'));
            twitchAccessForm.find('.submit-form').removeAttr('disabled');
            twitchAccessForm.find('.submit-form').removeClass('spin');
            if (success) {
              ui.closeModal();
              showNotification('success', 'Success', 'Access granted!');
            } else showNotification('error', 'Error', response.message);
          }
        );
      };
      formActions['form-painting-moderator-add'] = function (captchaToken) {
        var formPaintingModeratorAddElement = $('#form-painting-moderator-add'),
          moderatorFields = {};
        moderatorFields.manageModerator = true;
        moderatorFields.username = '';
        moderatorFields.painting = serverData.painting.id;
        moderatorFields.way = 1;
        var requestData = moderatorFields,
          username = prompt('Enter a username');
        username === null && (username = '');
        requestData.username = username;
        captchaToken !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/get-painting-access.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/get-painting-access.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formPaintingModeratorAddElement
              .find('.submit-form')
              .text(formPaintingModeratorAddElement.find('.submit-form').attr('data-text'));
            formPaintingModeratorAddElement.find('.submit-form').removeAttr('disabled');
            formPaintingModeratorAddElement.find('.submit-form').removeClass('spin');
            success
              ? (canvasRenderer.fetchPaintingModerators(),
                showNotification('success', 'Success', 'New moderator added'))
              : showNotification('error', 'Error', response.message);
          }
        );
      };
      /**
       * Direct network calls: POST /api/post-guild.php.
       *
       * Observed DOM operations: val, prop.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-guild-store'] = function (gRecaptchaResponse) {
        var formGuildStoreElement = $('#form-guild-store'),
          guildFields = {};
        guildFields.storeGuild = true;
        guildFields.name = formGuildStoreElement.find('[name="name"]').val();
        guildFields.description = formGuildStoreElement.find('[name="description"]').val();
        guildFields.auto_accept = formGuildStoreElement.find('[name="auto-accept"]').val();
        guildFields.rank_1_title = $('.guild-ranks').find('input[name="rank_1"]').val();
        guildFields.rank_2_title = $('.guild-ranks').find('input[name="rank_2"]').val();
        guildFields.rank_3_title = $('.guild-ranks').find('input[name="rank_3"]').val();
        guildFields.rank_1_emblem = $('.guild-ranks').find('input[name="rank_1_emblem"]').prop('checked')
          ? true
          : false;
        guildFields.rank_1_members = $('.guild-ranks').find('input[name="rank_1_members"]').prop('checked')
          ? true
          : false;
        guildFields.rank_2_emblem = $('.guild-ranks').find('input[name="rank_2_emblem"]').prop('checked')
          ? true
          : false;
        guildFields.rank_2_members = $('.guild-ranks').find('input[name="rank_2_members"]').prop('checked')
          ? true
          : false;
        guildFields.rank_3_emblem = $('.guild-ranks').find('input[name="rank_3_emblem"]').prop('checked')
          ? true
          : false;
        guildFields.rank_3_members = $('.guild-ranks').find('input[name="rank_3_members"]').prop('checked')
          ? true
          : false;
        var requestData = guildFields;
        if (formGuildStoreElement.find('[name="id"]').val())
          requestData.id = formGuildStoreElement.find('[name="id"]').val();
        else {
          requestData.tag = formGuildStoreElement.find('[name="tag"]').val();
        }
        if (gRecaptchaResponse !== undefined) {
          requestData['g-recaptcha-response'] = gRecaptchaResponse;
          ui.goBackFromCaptcha();
          grecaptcha.reset();
        }
        ui.triggerLoader(true);
        api.xhr.req(
          'POST',
          '/api/post-guild.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/post-guild.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Observed DOM operations: text, attr, removeClass.
           *
           * Scheduled work: setTimeout (4000 ms).
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            ui.triggerLoader(false);
            formGuildStoreElement
              .find('.submit-form')
              .text(formGuildStoreElement.find('.submit-form').attr('data-text'));
            formGuildStoreElement.find('.submit-form').removeAttr('disabled');
            formGuildStoreElement.find('.submit-form').removeClass('spin');
            if (success) {
              if (requestData.id) showNotification('success', 'Success', 'Changes saved');
              else {
                showNotification(
                  'success',
                  'Success',
                  'Guild created! Check the bottom right button to manage your guild members, reloading the page in a few seconds...'
                );
                setTimeout(function () {
                  window.location.reload();
                }, 4000);
                ui.closeModal();
              }
            } else showNotification('error', 'Error', response.message);
          }
        );
      };
      /**
       * Direct network calls: POST /api/post-guild.php.
       *
       * Observed DOM operations: val, text, attr, removeClass.
       *
       * Input bindings: captchaToken. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-guild-delete'] = function (captchaToken) {
        var formGuildDeleteElement = $('#form-guild-delete'),
          guildDeletionFields = {};
        guildDeletionFields.storeGuild = true;
        guildDeletionFields.delete = true;
        var requestData = guildDeletionFields;
        if ($('#form-guild-store').find('[name="id"]').val()) {
          requestData.id = $('#form-guild-store').find('[name="id"]').val();
        }
        captchaToken !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        confirm('You are about to remove your guild and all its guild members')
          ? confirm("Are you sure? this action can't be undone")
            ? api.xhr.req(
                'POST',
                '/api/post-guild.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/post-guild.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Observed DOM operations: text, attr, removeClass.
                 *
                 * Scheduled work: setTimeout (4000 ms).
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  ui.triggerLoader(false);
                  formGuildDeleteElement
                    .find('.submit-form')
                    .text(formGuildDeleteElement.find('.submit-form').attr('data-text'));
                  formGuildDeleteElement.find('.submit-form').removeAttr('disabled');
                  formGuildDeleteElement.find('.submit-form').removeClass('spin');
                  success
                    ? (showNotification(
                        'success',
                        'Success',
                        'Guild deleted, reloading the page in a few seconds...'
                      ),
                      setTimeout(function () {
                        window.location.reload();
                      }, 4000),
                      ui.closeModal())
                    : showNotification('error', 'Error', response.message);
                }
              )
            : (ui.triggerLoader(false),
              formGuildDeleteElement
                .find('.submit-form')
                .text(formGuildDeleteElement.find('.submit-form').attr('data-text')),
              formGuildDeleteElement.find('.submit-form').removeAttr('disabled'),
              formGuildDeleteElement.find('.submit-form').removeClass('spin'))
          : (ui.triggerLoader(false),
            formGuildDeleteElement
              .find('.submit-form')
              .text(formGuildDeleteElement.find('.submit-form').attr('data-text')),
            formGuildDeleteElement.find('.submit-form').removeAttr('disabled'),
            formGuildDeleteElement.find('.submit-form').removeClass('spin'));
      };
      /**
       * Direct network calls: POST /api/post-guild-transfer.php.
       *
       * Observed DOM operations: text, attr, removeClass.
       *
       * Input bindings: unusedCaptchaToken. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-guild-transfer'] = function (unusedCaptchaToken) {
        var formGuildTransferElement = $('#form-guild-transfer'),
          guildTransferFields = {};
        guildTransferFields.transfer = true;
        var requestData = guildTransferFields;
        ui.triggerLoader(true);
        if (
          confirm(
            "You are about to transfer ownership of your guild. Are you sure? this action can't be undone and you will lose access to this guild."
          )
        ) {
          var username = prompt('Enter new owner username');
          username
            ? ((requestData.username = username),
              api.xhr.req(
                'POST',
                '/api/post-guild-transfer.php',
                requestData,
                true,
                /**
                 * HTTP completion callback for /api/post-guild-transfer.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                 *
                 * Observed DOM operations: text, attr, removeClass.
                 *
                 * Scheduled work: setTimeout (4000 ms).
                 *
                 * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                 */
                function (success, response) {
                  ui.triggerLoader(false);
                  formGuildTransferElement
                    .find('.submit-form')
                    .text(formGuildTransferElement.find('.submit-form').attr('data-text'));
                  formGuildTransferElement.find('.submit-form').removeAttr('disabled');
                  formGuildTransferElement.find('.submit-form').removeClass('spin');
                  success
                    ? (showNotification(
                        'success',
                        'Success',
                        'Guild ownership modified, reloading the page in a few seconds...'
                      ),
                      setTimeout(function () {
                        window.location.reload();
                      }, 4000),
                      ui.closeModal())
                    : showNotification('error', 'Error', response.message);
                }
              ))
            : (ui.triggerLoader(false),
              formGuildTransferElement
                .find('.submit-form')
                .text(formGuildTransferElement.find('.submit-form').attr('data-text')),
              formGuildTransferElement.find('.submit-form').removeAttr('disabled'),
              formGuildTransferElement.find('.submit-form').removeClass('spin'));
        } else {
          ui.triggerLoader(false);
          formGuildTransferElement
            .find('.submit-form')
            .text(formGuildTransferElement.find('.submit-form').attr('data-text'));
          formGuildTransferElement.find('.submit-form').removeAttr('disabled');
          formGuildTransferElement.find('.submit-form').removeClass('spin');
        }
      };
      /**
       * Direct network calls: POST /api/delete-painting.php.
       *
       * Observed DOM operations: text, attr, removeClass.
       *
       * Input bindings: captchaToken. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-painting-delete'] = function (captchaToken) {
        var formPaintingDeleteElement = $('#form-painting-delete'),
          paintingDeletionFields = {};
        paintingDeletionFields.painting = serverData.painting.id;
        var requestData = paintingDeletionFields;
        captchaToken !== undefined && ui.goBackFromCaptcha();
        ui.triggerLoader(true);
        if (confirm('Do you really want to delete this painting?')) {
          api.xhr.req(
            'POST',
            '/api/delete-painting.php',
            requestData,
            true,
            /**
             * HTTP completion callback for /api/delete-painting.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
             *
             * Observed DOM operations: text, attr, removeClass.
             *
             * Scheduled work: setTimeout (2000 ms).
             *
             * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
             */
            function (success, response) {
              ui.triggerLoader(false);
              formPaintingDeleteElement
                .find('.submit-form')
                .text(formPaintingDeleteElement.find('.submit-form').attr('data-text'));
              formPaintingDeleteElement.find('.submit-form').removeAttr('disabled');
              formPaintingDeleteElement.find('.submit-form').removeClass('spin');
              success
                ? (showNotification('success', 'Painting deleted'),
                  setTimeout(function () {
                    window.location.replace('/' + appState.page);
                  }, 2000))
                : showNotification('error', 'Error', response.message);
            }
          );
        } else {
          ui.triggerLoader(false);
          formPaintingDeleteElement
            .find('.submit-form')
            .text(formPaintingDeleteElement.find('.submit-form').attr('data-text'));
          formPaintingDeleteElement.find('.submit-form').removeAttr('disabled');
          formPaintingDeleteElement.find('.submit-form').removeClass('spin');
        }
      };
      /**
       * Direct network calls: POST /api/post-painting.php.
       *
       * Shared/receiver state written: connection.ignoreRedirectRequest.
       *
       * Observed DOM operations: val, text, attr, removeClass.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-settings-painting'] = function (gRecaptchaResponse) {
        var formSettingsPaintingElement = $('#form-settings-painting'),
          paintingFields = {};
        paintingFields.managePainting = true;
        paintingFields.name = formSettingsPaintingElement.find('input[name="title"]').val();
        paintingFields.description = formSettingsPaintingElement.find('textarea[name="description"]').val();
        paintingFields.xMax = formSettingsPaintingElement.find('input[name="sizeX"]').val();
        paintingFields.yMax = formSettingsPaintingElement.find('input[name="sizeY"]').val();
        paintingFields.cooldown = formSettingsPaintingElement.find('input[name="cooldown"]').val();
        paintingFields.autoAcceptTime = formSettingsPaintingElement
          .find('input[name="autoAcceptTime"]')
          .val();
        paintingFields.visibility = formSettingsPaintingElement.find('input[name="access"]').val();
        paintingFields['default-color'] = formSettingsPaintingElement.find('input[name="background"]').val();
        paintingFields['allowed-colors'] = formSettingsPaintingElement
          .find('input[name="allowedColors"]')
          .val();
        paintingFields.template = formSettingsPaintingElement.find('input[name="template"]').val();
        paintingFields.protection = formSettingsPaintingElement.find('input[name="protection"]').val();
        paintingFields.shopItems = formSettingsPaintingElement.find('input[name="shop-items"]').val();
        paintingFields.nsfw = formSettingsPaintingElement.find('input[name="nsfw"]').val();
        paintingFields.discordRequired = formSettingsPaintingElement
          .find('input[name="discord-required"]')
          .val();
        paintingFields.rules = formSettingsPaintingElement.find('textarea[name="rules"]').val();
        paintingFields['brush-size'] = formSettingsPaintingElement.find('input[name="brush"]').val();
        paintingFields.replacePainting = '';
        var requestData = paintingFields,
          parts = requestData['allowed-colors'].split(',');
        if (gRecaptchaResponse !== undefined) {
          requestData['g-recaptcha-response'] = gRecaptchaResponse;
        }
        grecaptcha.reset();
        if (
          formSettingsPaintingElement.find('input[name="allowedColors"]').val() != '' &&
          parts.length == 1 &&
          parts[0] === ''
        ) {
          formSettingsPaintingElement
            .find('.submit-form')
            .text(formSettingsPaintingElement.find('.submit-form').attr('data-text'));
          formSettingsPaintingElement.find('.submit-form').removeAttr('disabled');
          formSettingsPaintingElement.find('.submit-form').removeClass('spin');
          showNotification('error', 'You must allow at least one color');
          return;
        } else {
          if (parts.length >= appState.painting.palette.colors.length) {
            requestData['allowed-colors'] = '';
          }
          if (formSettingsPaintingElement.find('input[name="id"]').val() != '') {
            requestData.boardId = parseInt(formSettingsPaintingElement.find('input[name="id"]').val());
            requestData.replacePainting = formSettingsPaintingElement
              .find('input[name="replacePainting"]')
              .val();
          }
          gRecaptchaResponse !== undefined && ui.goBackFromCaptcha();
          if (
            requestData.replacePainting === '' ||
            (requestData.replacePainting !== '' &&
              confirm(
                'You chose to copy another painting, this will replace your current painting with the one given. The width and height may also be modified. Would you like to continue?'
              ))
          ) {
            ui.triggerLoader(true);
            connection.ignoreRedirectRequest = true;
            api.xhr.req(
              'POST',
              '/api/post-painting.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-painting.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: connection.ignoreRedirectRequest.
               *
               * Observed DOM operations: text, attr, removeClass.
               *
               * Scheduled work: setTimeout (2000 ms).
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                ui.triggerLoader(false);
                formSettingsPaintingElement
                  .find('.submit-form')
                  .text(formSettingsPaintingElement.find('.submit-form').attr('data-text'));
                formSettingsPaintingElement.find('.submit-form').removeAttr('disabled');
                formSettingsPaintingElement.find('.submit-form').removeClass('spin');
                if (success) {
                  if (requestData.boardId !== undefined) {
                    showNotification('success', 'Changes saved');
                    setTimeout(function () {
                      window.location.replace('/' + serverData.painting.id + '-' + serverData.painting.slug);
                    }, 2000);
                  } else {
                    showNotification('success', 'Painting created');
                    setTimeout(function () {
                      window.location.replace('/' + response.id + '-' + response.slug);
                    }, 2000);
                  }
                } else {
                  connection.ignoreRedirectRequest = false;
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          } else {
            formSettingsPaintingElement
              .find('.submit-form')
              .text(formSettingsPaintingElement.find('.submit-form').attr('data-text'));
            formSettingsPaintingElement.find('.submit-form').removeAttr('disabled');
            formSettingsPaintingElement.find('.submit-form').removeClass('spin');
          }
        }
      };
      /**
       * Direct network calls: POST /api/post-coin-island.php.
       *
       * Observed DOM operations: attr, removeClass.
       *
       * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-attack-coinisland'] = function (gRecaptchaResponse) {
        var formAttackCoinislandElement = $('#form-attack-coinisland'),
          warAttackRequest = {};
        warAttackRequest.attack = true;
        var requestData = warAttackRequest;
        gRecaptchaResponse !== undefined && (requestData['g-recaptcha-response'] = gRecaptchaResponse);
        grecaptcha.reset();
        requestData.island = $('#submit-attack-coinisland').attr('data-island');
        ui.closeModal();
        if ($(this).hasClass('disabled')) {
          showNotification(
            'error',
            'Island still protected',
            'You must wait until the end of the protection time to be able to attack the island. (10 minutes protection after every attack on the island)'
          );
          openCoinIsland(requestData.island);
        } else {
          var amount = prompt(
            'You are about to spend PP coins to attack this island. Enter how much you want to spend (or you can just keep the current price!). But if you enter a bigger value, you will raise the attack price to that value for the next attacker and decrease the chance someone can take over right away!',
            $('#submit-attack-coinisland').attr('data-price')
          );
          if (!amount) {
            formAttackCoinislandElement.find('.submit-form').removeAttr('disabled');
            formAttackCoinislandElement.find('.submit-form').removeClass('spin');
            openCoinIsland(requestData.island);
          } else
            parseInt(amount) < parseInt($('#submit-attack-coinisland').attr('data-price'))
              ? (formAttackCoinislandElement.find('.submit-form').removeAttr('disabled'),
                formAttackCoinislandElement.find('.submit-form').removeClass('spin'),
                openCoinIsland(requestData.island),
                showNotification(
                  'error',
                  'Error',
                  "Custom attack price can't be lower than the current price"
                ))
              : ((requestData.amount = amount),
                api.xhr.req(
                  'POST',
                  '/api/post-coin-island.php',
                  requestData,
                  true,
                  /**
                   * HTTP completion callback for /api/post-coin-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                   *
                   * Shared/receiver state written: serverData.user.ppcoins.
                   *
                   * Observed DOM operations: removeClass, text, hide.
                   *
                   * Scheduled work: setTimeout (10000 ms).
                   *
                   * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                   */
                  function (success, response) {
                    formAttackCoinislandElement.find('.submit-form').removeAttr('disabled');
                    formAttackCoinislandElement.find('.submit-form').removeClass('spin');
                    openCoinIsland(requestData.island);
                    success
                      ? ((serverData.user.ppcoins = parseInt(response.ppcoins)),
                        $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                          serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
                        ),
                        showNotification('success', 'Success!', 'The island is yours! YARRRRRR!'),
                        $('#coin-island').hide(),
                        setTimeout(function () {
                          window.location.reload();
                        }, 10000))
                      : showNotification('error', 'Error', response.message);
                  }
                ));
        }
      };
      /**
       * Direct network calls: POST /api/post-coin-island.php.
       *
       * Observed DOM operations: attr.
       *
       * Input bindings: gRecaptchaResponse. Names describe inferred roles; protocol field names are preserved separately.
       */
      formActions['form-claim-coinisland-coins'] = function (gRecaptchaResponse) {
        var formClaimCoinislandCoinsElement = $('#form-claim-coinisland-coins'),
          warRewardRequest = {};
        warRewardRequest.claim = true;
        var requestData = warRewardRequest;
        gRecaptchaResponse !== undefined && (requestData['g-recaptcha-response'] = gRecaptchaResponse);
        grecaptcha.reset();
        ui.closeModal();
        requestData.island = $('#submit-claim-coinisland-coins').attr('data-island');
        api.xhr.req(
          'POST',
          '/api/post-coin-island.php',
          requestData,
          true,
          /**
           * HTTP completion callback for /api/post-coin-island.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
           *
           * Shared/receiver state written: serverData.user.ppcoins.
           *
           * Observed DOM operations: removeClass, text.
           *
           * Scheduled work: setTimeout (3000 ms).
           *
           * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
           */
          function (success, response) {
            formClaimCoinislandCoinsElement.find('.submit-form').removeAttr('disabled');
            formClaimCoinislandCoinsElement.find('.submit-form').removeClass('spin');
            openCoinIsland(requestData.island);
            if (success) {
              serverData.user.ppcoins = parseInt(response.ppcoins);
              $('#modals .box[data-id="main"] .box-header .coins-infos span').text(
                serverData.user.ppcoins + ' coin' + (serverData.user.ppcoins != 1 ? 's' : '')
              );
              showNotification('success', 'Success!', 'Coins claimed!');
              setTimeout(function () {
                window.location.reload();
              }, 3000);
            } else {
              showNotification('error', 'Error', response.message);
            }
          }
        );
      };
      formActions['form-painting-load-more-list'] = function () {
        var paintingListStart =
          canvasRenderer.paintingListStart + serverData.user.settings.painting.listMaxPaintings;
        canvasRenderer.refreshPaintingList(paintingListStart);
      };
      formActions['form-guilds-load-more'] = function () {
        var lastStartGuildFetch = ui.lastStartGuildFetch + ui.guildListLimit + 1;
        ui.loadGuilds(lastStartGuildFetch);
      };
      var captchaActions = formActions;
      if (window.location.href.indexOf('?forgotKey=') !== -1) {
        ui.openModal('auth', 'forgot-activation');
        return;
      }
      function updateConnectionVersion() {
        connection.wsv > -1
          ? (connection.wsv = parseInt(CFVersion.split('')[randomInteger(0, 0)]))
          : (connection.wsv = 0);
      }
      /**
       * Connection lifecycle boundary. Creating the Socket.IO transport is followed by the existing authentication/painting handshake; transport connectivity and application readiness are separate states. Server-event callbacks update the same renderer, account and chat state used by the UI. Reconnect/reset branches intentionally retain their original ordering and pending-data behavior.
       *
       * Shared/receiver state written: connection.started, connection.io, connection.errors.
       */
      /* Create the original websocket-only Socket.IO connection and register its server-event handlers. Reconnection uses the existing handshake and state-reset logic. */
      function connectRealtime() {
        if (connection.started) {
          return;
        } else {
          {
            connection.started = true;
            var transportsData = {};
            transportsData.transports = ['websocket'];
            connection.io = io(serverData.host.wss, transportsData);
            var errors = {};
            errors['0'] = "You need to login on pixelplace.io first. Create an account, it's free !";
            errors['1'] = 'Your session expired, please refresh the page';
            errors['2'] = 'You need to create a username first';
            errors['3'] = 'Color not found';
            errors['4'] = 'This color is only available to premium subscribers';
            errors['5'] = 'Wrong coordinates';
            errors['6'] =
              'This canvas has been temporarily disabled because its owner used premium settings on it and his membership has expired. Please wait for the owner to renew his premium membership or to revert canvas settings to non premium ones';
            errors['7'] =
              'Your premium membership has expired and this canvas is using premium settings. To continue, please renew your membership or revert canvas settings back to non premium ones';
            errors['8'] = 'Please wait until the end of your cooldown';
            errors['9'] = "This canvas is private, you can't draw on it";
            errors['10'] =
              'To be able to place pixels on this canvas, you have to request approval from the owner';
            errors['11'] = 'You are placing pixels too fast, please slow down';
            errors['12'] = 'This canvas is terminated';
            errors['13'] = 'Error while getting canvas data';
            errors['14'] = 'Error while getting canvas access data';
            errors['15'] =
              'You have too many instances of pixelplace.io opened, please close some windows/tabs. If you are using a proxy or shared connection, you may need to switch to a private one';
            errors['16'] =
              'Too many users share your internet connection. If you are using a proxy or shared connection, you may need to switch to a private one or another proxy location';
            errors['17'] =
              'Pixelplace.io has been disabled for your internet connection (are you  using a proxy ?)';
            errors['18'] = 'Server is full, please try again later';
            errors['19'] = 'Reloading..';
            errors['20'] =
              'Your account has been temporarily disabled for placing pixels and/or sending messages too fast, try again in 5 minutes';
            errors['21'] = 'You need to be a Premium subscriber to draw on Prime Island';
            errors['22'] = 'User offline';
            errors['23'] = 'Servers full, please wait';
            errors['24'] = 'You need to be connected before sending messages';
            errors['25'] = 'You are sending messages too fast';
            errors['26'] = 'Your account is still suspended from the chat (temporarily)';
            errors['27'] =
              'Your account is permanently banned from the chat, please contact moderators on discord or support@pixelplace.io if you need help';
            errors['28'] = 'You need to create a username before sending messages';
            errors['29'] = 'You are not allowed to send commands';
            errors['30'] = 'You need to join a Guild first';
            errors['31'] = 'You need to be a premium subscriber';
            errors['32'] = 'Painting archived';
            errors['33'] =
              'Servers are full, we are limiting instances of pixelplace.io opened per user, please close some windows/tabs';
            errors['34'] =
              'Servers are full, we are limiting instances of pixelplace.io opened per internet connections, please close some windows/tabs. If you are using a proxy or shared connection, you may need to switch to a private one';
            connection.errors = errors;
            /* A transport connection is not yet an authenticated painting session; the original authentication handshake follows. */
            connection.io.on(
              'connect',
              /**
               * Registered connect callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Outgoing socket event names: init.
               *
               * Scheduled work: setTimeout (1500 ms).
               *
               * Input bindings: connectPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (connectPayload) {
                updateConnectionVersion();
                var authKeyData = {};
                authKeyData.authKey = Cookies.get('authKey');
                authKeyData.authToken = Cookies.get('authToken');
                authKeyData.authId = Cookies.get('authId');
                authKeyData.boardId = serverData.painting.id;
                connection.io.emit('init', authKeyData);
                setTimeout(function () {
                  canvasRenderer.loadFriends();
                  chat.updateScroll(chat.selected, true);
                }, 1500);
              }
            );
            connection.io.on('connect_error', function (connectErrorPayload) {
              setPaintingLoading(
                true,
                'Connection lost<br/>Trying to reconnect...<br/>Please wait<br/><a href="https://discord.gg/xcFJ6nY" target="_blank">Need help?</a>'
              );
            });
            connection.io.on(
              'rate_change',
              /**
               * Registered rate_change callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: serverData.painting.rate, imagePainter.rate.
               *
               * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (event) {
                serverData.painting.rate = parseInt(event);
                if (imagePainter && imagePainter.rate && serverData.painting.rate > imagePainter.rate) {
                  imagePainter.rate = serverData.painting.rate;
                }
              }
            );
            connection.io.on(
              'ping.alive',
              /**
               * Registered ping.alive callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Outgoing socket event names: pong.alive.
               *
               * Input bindings: pingAlivePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (pingAlivePayload) {
                {
                  let entries = [6, 5, 9, 4, 5];
                  entries.push(connection.wsv);
                  entries.push(connection.wsa);
                  entries.push(connection.wsb);
                  entries.push(canvasRenderer.pSave);
                  var timestamp = nowSeconds() + canvasRenderer.tDelay - 5400,
                    text = timestamp + '',
                    parts = text.split(''),
                    randomCacheTokenResult = '',
                    count = 0,
                    countValue0Setting = 0;
                  while (count < entries.length) {
                    randomInteger(0, 1) == 1
                      ? (randomCacheTokenResult += randomCacheToken(entries[count]))
                      : (randomCacheTokenResult += randomAlphanumericString(entries[count]));
                    if (Math.floor(Math.random() * 2) === 0)
                      randomCacheTokenResult += digitLetters[parseInt(parts[count])].toUpperCase();
                    else {
                      randomCacheTokenResult += digitLetters[parseInt(parts[count])];
                    }
                    count++;
                  }
                  if (randomInteger(0, 1) == 1) {
                    randomCacheTokenResult += userCacheDigit + randomCacheToken(randomInteger(4, 20));
                  } else {
                    randomCacheTokenResult += userCacheDigit + randomAlphanumericString(randomInteger(4, 25));
                  }
                  randomCacheTokenResult = randomCacheTokenResult + '0=';
                  connection.io.emit('pong.alive', randomCacheTokenResult);
                }
              }
            );
            connection.io.on(
              'coin_island_owner',
              /**
               * Registered coin_island_owner callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: show, css, text, remove.
               *
               * Input bindings: coinIslandOwnerPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (coinIslandOwnerPayload) {
                if (parseInt(serverData.painting.id) === 7) {
                  if (parseInt(coinIslandOwnerPayload.island) === 0) {
                    var styles = {};
                    styles.top = '952px';
                    styles.left = '818px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner')
                      .text(coinIslandOwnerPayload.from)
                      .css(styles)
                      .show();
                  } else if (parseInt(coinIslandOwnerPayload.island) === 1) {
                    var coinIslandOwnerStyles = {};
                    coinIslandOwnerStyles.top = '848px';
                    coinIslandOwnerStyles.left = '927px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner-1')
                      .text(coinIslandOwnerPayload.from)
                      .css(coinIslandOwnerStyles)
                      .show();
                  } else if (parseInt(coinIslandOwnerPayload.island) === 2) {
                    var pxStyles = {};
                    pxStyles.top = '902px';
                    pxStyles.left = '950px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner-2')
                      .text(coinIslandOwnerPayload.from)
                      .css(pxStyles)
                      .show();
                  } else if (parseInt(coinIslandOwnerPayload.island) === 3) {
                    var topPxLeftPxStyles = {};
                    topPxLeftPxStyles.top = '948px';
                    topPxLeftPxStyles.left = '927px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner-3')
                      .text(coinIslandOwnerPayload.from)
                      .css(topPxLeftPxStyles)
                      .show();
                  }
                } else canvasRenderer.element.move.find('#coin-island-owner').remove();
              }
            );
            connection.io.on(
              'coin_island_owner_change',
              /**
               * Registered coin_island_owner_change callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: show, css, text, remove.
               *
               * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (event) {
                if (parseInt(serverData.painting.id) === 7) {
                  if (parseInt(event.island) === 0) {
                    var styles = {};
                    styles.top = '952px';
                    styles.left = '818px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner')
                      .text(event.from)
                      .css(styles)
                      .show();
                    var message =
                      '<a href="#" class="open-profile" data-profile="' +
                      event.from +
                      '">' +
                      event.from +
                      '</a> attacked Coin Island and took ownership. <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div>' +
                      event.amount +
                      ' unclaimed coins stolen!';
                  } else if (parseInt(event.island) === 1) {
                    var coinIslandOwnerChangeStyles = {};
                    coinIslandOwnerChangeStyles.top = '848px';
                    coinIslandOwnerChangeStyles.left = '927px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner-1')
                      .text(event.from)
                      .css(coinIslandOwnerChangeStyles)
                      .show();
                    var message =
                      '<a href="#" class="open-profile" data-profile="' +
                      event.from +
                      '">' +
                      event.from +
                      '</a> attacked Tiny Coin Island #1 and took ownership. <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div>' +
                      event.amount +
                      ' unclaimed coins stolen!';
                  } else if (parseInt(event.island) === 2) {
                    var pxStyles = {};
                    pxStyles.top = '902px';
                    pxStyles.left = '950px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner-2')
                      .text(event.from)
                      .css(pxStyles)
                      .show();
                    var message =
                      '<a href="#" class="open-profile" data-profile="' +
                      event.from +
                      '">' +
                      event.from +
                      '</a> attacked Tiny Coin Island #2 and took ownership. <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div>' +
                      event.amount +
                      ' unclaimed coins stolen!';
                  } else if (parseInt(event.island) === 3) {
                    var coinIslandOwnerStyles = {};
                    coinIslandOwnerStyles.top = '948px';
                    coinIslandOwnerStyles.left = '927px';
                    canvasRenderer.element.move
                      .find('#coin-island-owner-3')
                      .text(event.from)
                      .css(coinIslandOwnerStyles)
                      .show();
                    var message =
                      '<a href="#" class="open-profile" data-profile="' +
                      event.from +
                      '">' +
                      event.from +
                      '</a> attacked Tiny Coin Island #3 and took ownership. <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div>' +
                      event.amount +
                      ' unclaimed coins stolen!';
                  }
                  var messageData = {};
                  messageData.type = 'custom';
                  messageData.target = '';
                  messageData.color = 0;
                  messageData.mention = '';
                  messageData.username = '';
                  messageData.message = message;
                  messageData.icons = [];
                  messageData.createdAt = '';
                  chat.addMessageRow(messageData, chat.selected);
                } else canvasRenderer.element.move.find('#coin-island-owner').remove();
              }
            );
            connection.io.on(
              'username',
              /**
               * Registered username callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: canvasRenderer.liveTrackingUsers[computed].n, trackedUsernames[computed].
               *
               * Observed DOM operations: show, text, attr.
               *
               * Input bindings: usernamePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (usernamePayload) {
                if (canvasRenderer.liveTrackingUsers[usernamePayload.id] !== undefined) {
                  canvasRenderer.liveTrackingUsers[usernamePayload.id].n = usernamePayload.name;
                  if (trackedUsername && usernamePayload.name.toLowerCase() !== trackedUsername) {
                  } else
                    canvasRenderer.element.move
                      .find('.track[data-id="' + usernamePayload.id + '"]')
                      .attr('data-profile', usernamePayload.name.toLowerCase())
                      .text(usernamePayload.name)
                      .show();
                }
                serverData.user.settings.painting.saveTracking &&
                  ((trackedUsernames[usernamePayload.id] = usernamePayload.name),
                  saveTrackingButton.find('li[data-id="' + usernamePayload.id + '"] .username').length &&
                    saveTrackingButton
                      .find('li[data-id="' + usernamePayload.id + '"] .username')
                      .text(usernamePayload.name)
                      .attr('data-profile', usernamePayload.name));
              }
            );
            connection.io.on(
              'server_time',
              /**
               * Registered server_time callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: canvasRenderer.tDelay.
               *
               * Input bindings: serverTimePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (serverTimePayload) {
                var timestamp = nowSeconds(),
                  number = parseInt(serverTimePayload),
                  tDelay = 0;
                if (number < timestamp) tDelay = number - timestamp;
                else if (number > timestamp) {
                  tDelay = number - timestamp;
                }
                canvasRenderer.tDelay = tDelay;
              }
            );
            connection.io.on(
              'j',
              /**
               * Registered j callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: text.
               *
               * Input bindings: jPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (jPayload) {
                if (!serverData.user.settings.chat.invisible) {
                  if (serverData.user.name.toLowerCase() !== jPayload.toLowerCase()) {
                    if (serverData.user.friends.indexOf(jPayload) !== -1) {
                      var text = parseInt(
                        $('[data-id="social"][data-tab="friends"] .notification-bubble').text()
                      );
                      text++;
                      $('[data-id="social"][data-tab="friends"] .notification-bubble').text(text);
                      if (serverData.user.settings.chat.friendsNotifications) {
                        showNotification('info', jPayload + ' went online');
                      }
                    }
                  }
                }
              }
            );
            connection.io.on(
              'l',
              /**
               * Registered l callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: text.
               *
               * Input bindings: lPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (lPayload) {
                if (!serverData.user.settings.chat.invisible) {
                  if (serverData.user.name.toLowerCase() !== lPayload.toLowerCase()) {
                    if (serverData.user.friends.indexOf(lPayload) !== -1) {
                      var text = parseInt(
                        $('[data-id="social"][data-tab="friends"] .notification-bubble').text()
                      );
                      text--;
                      text < 0 && (text = 0);
                      $('[data-id="social"][data-tab="friends"] .notification-bubble').text(text);
                      if (serverData.user.settings.chat.friendsNotifications) {
                        showNotification('info', lPayload + ' went offline');
                      }
                    }
                  }
                }
              }
            );
            var chatUserMessageTimestamp = 0;
            connection.io.on(
              'chat.user.message',
              /**
               * Registered chat.user.message callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: chatUserMessageTimestamp.
               *
               * Input bindings: chatUserMessagePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (chatUserMessagePayload) {
                var silent = false;
                if (chatUserMessagePayload.silent) {
                  silent = true;
                }
                if (silent && chat.startLoaded) {
                } else {
                  var messageData = {};
                  messageData.type = chatUserMessagePayload.type;
                  messageData.target = chatUserMessagePayload.target;
                  messageData.color = chatUserMessagePayload.color;
                  messageData.mention = chatUserMessagePayload.mention;
                  messageData.username = chatUserMessagePayload.username;
                  messageData.guild = chatUserMessagePayload.guild;
                  messageData.message = chatUserMessagePayload.message;
                  messageData.icons = chatUserMessagePayload.icons;
                  messageData.createdAt = chatUserMessagePayload.createdAt;
                  messageData.channel = chatUserMessagePayload.channel;
                  messageData.silent = silent;
                  messageData.rainbow =
                    chatUserMessagePayload.rainbow !== undefined && chatUserMessagePayload.rainbow
                      ? true
                      : false;
                  messageData.golden =
                    chatUserMessagePayload.golden !== undefined && chatUserMessagePayload.golden
                      ? true
                      : false;
                  messageData.xmas =
                    chatUserMessagePayload.xmas !== undefined && chatUserMessagePayload.xmas ? true : false;
                  messageData.halloween =
                    chatUserMessagePayload.halloween !== undefined && chatUserMessagePayload.halloween
                      ? true
                      : false;
                  messageData.snowballed = chatUserMessagePayload.snowballed;
                  var messageDataMessageData = messageData;
                  if (
                    chatUserMessagePayload.posX !== undefined &&
                    chatUserMessagePayload.posY !== undefined &&
                    chatUserMessagePayload.posS !== undefined
                  ) {
                    messageDataMessageData.posY = chatUserMessagePayload.posY;
                    messageDataMessageData.posX = chatUserMessagePayload.posX;
                    messageDataMessageData.posS = chatUserMessagePayload.posS;
                  }
                  chat.addMessageRow(messageDataMessageData, chatUserMessagePayload.channel);
                  if (chatUserMessageTimestamp < nowSeconds() - 60) {
                    chatUserMessageTimestamp = nowSeconds();
                    if (
                      chatUserMessagePayload.channel === 'painting' &&
                      chatUserMessagePayload.type === 'chat'
                    ) {
                      if (
                        chatUserMessagePayload.message === '/rules' ||
                        chatUserMessagePayload.message === '!rules'
                      ) {
                        var chatUserMessageMessageData = {};
                        chatUserMessageMessageData.type = 'system';
                        chatUserMessageMessageData.message = 'Rules: ' + serverData.painting.rules;
                        chat.addMessageRow(chatUserMessageMessageData);
                      }
                    }
                  }
                  if (
                    chatUserMessagePayload.channel === 'whispers' &&
                    chatUserMessagePayload.target.toLowerCase() !== serverData.user.name.toLowerCase()
                  ) {
                    if (!('Notification' in window)) {
                    } else if (Notification.permission === 'granted') {
                      const notification = new Notification(
                        messageDataMessageData.username + ' says: ' + messageDataMessageData.message
                      );
                    } else
                      Notification.permission !== 'denied' &&
                        Notification.requestPermission().then((argument) => {
                          if (argument === 'granted') {
                            const notification = new Notification(
                              messageDataMessageData.username + ' says: ' + messageDataMessageData.message
                            );
                          }
                        });
                  }
                }
              }
            );
            connection.io.on(
              'chat.messages.loaded',
              /**
               * Registered chat.messages.loaded callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: chat.elem.container.show, chat.elem.button.collapsed.hide.
               *
               * Scheduled work: setTimeout (30000 ms).
               *
               * Input bindings: chatMessagesLoadedPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (chatMessagesLoadedPayload) {
                if (chat.isDisplayed) {
                  chat.elem.container.show();
                  chat.elem.button.collapsed.hide();
                }
                if (!chat.startLoaded) {
                  initializeChatChannel();
                }
                setTimeout(
                  /**
                   * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                   *
                   * Shared/receiver state written: chat.startLoaded.
                   */
                  function () {
                    chat.startLoaded = true;
                  },
                  30000
                );
              }
            );
            connection.io.on('chat.system.delete', function (chatSystemDeletePayload) {
              chat.deleteMessagesByUsername(chatSystemDeletePayload);
            });
            connection.io.on('chat.painting.delete', function (chatPaintingDeletePayload) {
              chat.deleteMessagesByUsername(chatPaintingDeletePayload, true);
            });
            connection.io.on('chat.system.announce', function (chatSystemAnnouncePayload) {
              var messageData = {};
              messageData.type = 'announce';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message = chatSystemAnnouncePayload;
              messageData.icons = '';
              messageData.guild = '';
              messageData.createdAt = '';
              chat.addMessageRow(messageData, chat.selected);
            });
            connection.io.on('chat.custom.message', function (chatCustomMessagePayload) {
              var messageData = {};
              messageData.type = 'warning';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message = chatCustomMessagePayload;
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, chat.selected);
            });
            connection.io.on(
              'chat.stats',
              /**
               * Registered chat.stats callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: imagePainter.rate, imagePainter.status.
               *
               * Observed DOM operations: chat.elem.onlineValue.text, chat.elem.onlineValue.attr, chat.elem.onlineSubValue.hide.
               *
               * Input bindings: chatStatsPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (chatStatsPayload) {
                chat.elem.onlineValue.text(chatStatsPayload[1]);
                if (chatStatsPayload[3] !== undefined && chatStatsPayload[3][2] !== undefined) {
                  imagePainter.rate &&
                    (serverData.user.premium.active
                      ? (imagePainter.rate = parseInt(chatStatsPayload[3][1]))
                      : (imagePainter.rate = parseInt(chatStatsPayload[3][0])),
                    (imagePainter.status = parseInt(chatStatsPayload[3][2])));
                }
                chatStatsPayload[2] !== undefined && parseInt(chatStatsPayload[2]) > 0
                  ? chat.elem.onlineValue.attr(
                      'title',
                      chatStatsPayload[0] +
                        ' players connected & ' +
                        chatStatsPayload[2] +
                        ' on this painting'
                    )
                  : chat.elem.onlineValue.attr('title', chatStatsPayload[0] + ' players connected');
                chat.elem.onlineSubValue.hide();
              }
            );
            connection.io.on('canvas.alert', function (canvasAlertPayload) {
              showNotification('warning', canvasAlertPayload, '');
            });
            connection.io.on('canvas.success', function (canvasSuccessPayload) {
              showNotification('success', canvasSuccessPayload, '');
            });
            connection.io.on('chat.system.message', function (chatSystemMessagePayload) {
              var messageData = {};
              messageData.type = 'system';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message = connection.errors[chatSystemMessagePayload];
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, chat.selected);
            });
            connection.io.on('item.notification.gift', function (itemNotificationGiftPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                '<a href="#" class="open-profile" data-profile="' +
                itemNotificationGiftPayload.from +
                '">' +
                itemNotificationGiftPayload.from +
                '</a> sent a gift to <a href="#" class="open-profile" data-profile="' +
                itemNotificationGiftPayload.to +
                '">' +
                itemNotificationGiftPayload.to +
                '</a>: 1x<a href="#" class="open-item" data-item="' +
                itemNotificationGiftPayload.item +
                '" style="color:' +
                serverData.shop.items[itemNotificationGiftPayload.item].color +
                '">[' +
                serverData.shop.items[itemNotificationGiftPayload.item].name +
                ']</a>';
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, 'global');
            });
            connection.io.on('auction.notification.win', function (auctionNotificationWinPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                '<a href="#" class="open-profile" data-profile="' +
                auctionNotificationWinPayload.owner_username +
                '">' +
                auctionNotificationWinPayload.owner_username +
                '</a> won the <a href="#" class="open-framed-auction frame-c-' +
                auctionNotificationWinPayload.frame_id +
                '" data-framed="' +
                auctionNotificationWinPayload.id +
                '">Painting #' +
                auctionNotificationWinPayload.id +
                '</a> auction for <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div> ' +
                auctionNotificationWinPayload.current_bid;
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, 'global');
              openAuction(auctionNotificationWinPayload);
            });
            connection.io.on('auction.new.painting', function (auctionNewPaintingPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                '<a href="#" class="open-profile" data-profile="' +
                auctionNewPaintingPayload.owner_username +
                '">' +
                auctionNewPaintingPayload.owner_username +
                '</a> has listed <a href="#" class="open-framed-auction frame-c-' +
                auctionNewPaintingPayload.frame_id +
                '" data-framed="' +
                auctionNewPaintingPayload.id +
                '">Painting #' +
                auctionNewPaintingPayload.id +
                '</a> for <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div> ' +
                auctionNewPaintingPayload.current_bid;
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, 'global');
            });
            connection.io.on('auction.new.bid', function (auctionNewBidPayload) {
              openAuction(auctionNewBidPayload);
            });
            connection.io.on('area_fight_bonus_chest', function (areaFightBonusChestPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                '<a href="#" class="open-profile" data-profile="' +
                areaFightBonusChestPayload +
                '">' +
                areaFightBonusChestPayload +
                '</a> also won a <a href="#" class="open-item" data-item="13" style="color:#ffbe00;">[Treasure Chest]</a>';
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, 'global');
            });
            connection.io.on('auction.lost.bid', function (auctionLostBidPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                'You have been outbid by <a href="#" class="open-profile" data-profile="' +
                auctionLostBidPayload.current_bid_username +
                '">' +
                auctionLostBidPayload.current_bid_username +
                '</a> on the  <a href="#" class="open-framed-auction" data-framed="' +
                auctionLostBidPayload.id +
                '">Painting #' +
                auctionLostBidPayload.id +
                '</a> auction.';
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, 'global');
              showNotification(
                'warning',
                'Auction House',
                'You have been outbid by ' +
                  auctionLostBidPayload.current_bid_username +
                  ' on the Painting #' +
                  auctionLostBidPayload.id +
                  ' auction.'
              );
            });
            connection.io.on('item.notification.snowball', function (itemNotificationSnowballPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                '❄️ <a href="#" class="open-profile" data-profile="' +
                itemNotificationSnowballPayload.from +
                '">' +
                itemNotificationSnowballPayload.from +
                '</a> threw a /snowball at <a href="#" class="open-profile" data-profile="' +
                itemNotificationSnowballPayload.to +
                '">' +
                itemNotificationSnowballPayload.to +
                '</a> (' +
                itemNotificationSnowballPayload.snowballed +
                ')';
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, 'global');
              chat.elem.container.find('.messages .row').each(
                /**
                 * Observed DOM operations: attr.
                 *
                 * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
                 */
                function () {
                  if (
                    $(this).find('.user').length &&
                    $(this).find('.user').attr('data-id').toLowerCase() ===
                      itemNotificationSnowballPayload.to.toLowerCase()
                  ) {
                    var snowballAltElement = $(this).find('.snowball-alt'),
                      snowballIcnElement = $(this).find('.snowball-icn'),
                      snowballed = parseInt(itemNotificationSnowballPayload.snowballed);
                    snowballIcnElement.length < snowballed &&
                      ((snowballed = snowballed - snowballIcnElement.length),
                      snowballAltElement.each(
                        /**
                         * Observed DOM operations: attr.
                         *
                         * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
                         */
                        function () {
                          if (snowballed > 0) {
                            $(this).attr('src', '/img/badges/snowball.png');
                            $(this).attr('alt', 'OH OH OH!');
                            $(this).attr('title', 'OH OH OH!');
                            snowballed--;
                          }
                        }
                      ));
                  }
                }
              );
            });
            connection.io.on('golden.notification', function (goldenNotificationPayload) {
              if (parseInt(goldenNotificationPayload.way) === 1) {
                var messageData = {};
                messageData.type = 'custom';
                messageData.target = '';
                messageData.color = 0;
                messageData.mention = '';
                messageData.username = '';
                messageData.message =
                  '<a href="#" class="open-profile" data-profile="' +
                  goldenNotificationPayload.username +
                  '">' +
                  goldenNotificationPayload.username +
                  '</a> is now part of the top 5 <a href="#" class="open-gold-rush">Gold bars</a> owners';
                messageData.icons = [];
                messageData.golden = 1;
                messageData.createdAt = '';
                chat.addMessageRow(messageData, 'global');
              }
            });
            connection.io.on(
              'item.notification.use',
              /**
               * Registered item.notification.use callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: timestamp.
               *
               * Input bindings: itemNotificationUsePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (itemNotificationUsePayload) {
                parseInt(itemNotificationUsePayload.userId) === serverData.user.id &&
                  (timestamp = nowSeconds());
                var text = 'dropped';
                if (parseInt(itemNotificationUsePayload.item) === 1) text = 'fired a';
                else if (parseInt(itemNotificationUsePayload.item) === 2) text = 'dropped a';
                else if (
                  parseInt(itemNotificationUsePayload.item) === 3 ||
                  parseInt(itemNotificationUsePayload.item) === 8
                )
                  text = 'dropped an';
                else if (parseInt(itemNotificationUsePayload.item) === 7) {
                  text = 'dropped a';
                }
                var scale = canvasRenderer.scale;
                itemNotificationUsePayload.zoom && (scale = parseInt(itemNotificationUsePayload.zoom));
                scale === 1 && (scale = canvasRenderer.scale);
                var messageData = {};
                messageData.type = 'custom';
                messageData.target = '';
                messageData.color = 0;
                messageData.mention = '';
                messageData.username = '';
                messageData.message =
                  '<a href="#" class="open-profile" data-profile="' +
                  itemNotificationUsePayload.from +
                  '">' +
                  itemNotificationUsePayload.from +
                  '</a> ' +
                  text +
                  ' <a href="#" class="open-item" data-item="' +
                  itemNotificationUsePayload.item +
                  '" style="color:' +
                  serverData.shop.items[itemNotificationUsePayload.item].color +
                  '">[' +
                  itemNotificationUsePayload.itemName +
                  ']</a> on <a href="/' +
                  itemNotificationUsePayload.painting +
                  '" >#' +
                  itemNotificationUsePayload.painting +
                  '</a>, position <a href="#" class="go-to-coords" data-x="' +
                  itemNotificationUsePayload.x +
                  '" data-y="' +
                  itemNotificationUsePayload.y +
                  '" data-s="' +
                  scale +
                  '" title="Click to view">[' +
                  itemNotificationUsePayload.x +
                  ',' +
                  itemNotificationUsePayload.y +
                  ']</a>';
                messageData.icons = [];
                messageData.createdAt = '';
                chat.addMessageRow(messageData, 'global');
                parseInt(itemNotificationUsePayload.item) !== 7 &&
                  parseInt(itemNotificationUsePayload.item) !== 8 &&
                  animateWeaponEffect(
                    itemNotificationUsePayload.item,
                    itemNotificationUsePayload.x,
                    itemNotificationUsePayload.y,
                    itemNotificationUsePayload.c
                  );
              }
            );
            $(document).on(
              'click',
              'a[data-alert]',
              /**
               * Registered click callback delegated to "a[data-alert]". It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: attr.
               *
               * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
               */
              function () {
                alert($(this).attr('data-alert'));
              }
            );
            var options = {},
              areasOptions = {};
            /**
             * Shared/receiver state written: warActive, areasOptions[computed].
             *
             * Observed DOM operations: remove, append, element.css, text, attr, show, element.show.
             *
             * Scheduled work: setInterval (10 ms).
             *
             * Input bindings: argument. Names describe inferred roles; protocol field names are preserved separately.
             */
            function callback(argument) {
              warActive = true;
              if (options[argument] !== undefined) {
                $('#areas > div[data-id="' + argument + '"]').remove();
                var element = $(
                  '<div data-id="' +
                    argument +
                    '" area-block="1"><a href="#" class="header" data-alert="Place as much pixels as you can within the rainbow area and with your guild members to conquer this territory before the timer ends. The guild or user with the most pixels placed during this fight will have its emblem displayed on the territory until the next war and gain battle points">War ends in <span>0:00</span></a></div>'
                );
                $('#areas').append(element);
                element.css('top', options[argument].yStart);
                element.css('left', options[argument].xStart);
                element.css('width', options[argument].xEnd - options[argument].xStart);
                element.css('height', options[argument].yEnd - options[argument].yStart);
                areasOptions[argument] && clearInterval(areasOptions[argument]);
                areasOptions[argument] = setInterval(
                  /**
                   * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                   *
                   * Observed DOM operations: selectedElement.hide, hide, text.
                   */
                  function () {
                    var selectedElement = $('#areas').find('div[data-id="' + argument + '"]');
                    if (selectedElement.length) {
                      var timestamp = nowSeconds();
                      if (options[argument].fightEndAt < timestamp) {
                        clearInterval(areasOptions[argument]);
                        selectedElement.hide();
                        $('#warTimer').hide();
                      } else {
                        var fightEndAt = options[argument].fightEndAt - timestamp;
                        if (fightEndAt > 0) {
                          var number = Math.floor(fightEndAt / 60),
                            text = fightEndAt - number * 60;
                          if (text < 10) {
                            text = '0' + text;
                          }
                          number = '0' + number + '';
                          text = text + '';
                        } else {
                          number = '00';
                          text = '00';
                        }
                        selectedElement.find('.header span').text(number + ':' + text);
                      }
                    } else {
                      clearInterval(areasOptions[argument]);
                      $('#warTimer').hide();
                    }
                  },
                  10
                );
                var x =
                    options[argument].xStart +
                    Math.round((options[argument].xEnd - options[argument].xStart) / 2),
                  y =
                    options[argument].yStart +
                    Math.round((options[argument].yEnd - options[argument].yStart) / 2);
                $('#warTimer')
                  .find('.head')
                  .text(
                    options[argument].name.toUpperCase() +
                      ' ' +
                      (parseInt(options[argument].fightType) === 1 ? 'PLAYER' : 'GUILD') +
                      ' WAR'
                  );
                $('#warTimer').attr('data-x', x);
                $('#warTimer').attr('data-y', y);
                $('#warTimer').show();
                element.show();
              }
            }
            /**
             * Shared/receiver state written: warActive.
             *
             * Observed DOM operations: remove, append, attr, css, element.css, element.show.
             *
             * Input bindings: argument. Names describe inferred roles; protocol field names are preserved separately.
             */
            function areaFightEndCallback(argument) {
              warActive = false;
              if (options[argument] !== undefined) {
                if (areasOptions[argument]) {
                  clearInterval(areasOptions[argument]);
                }
                $('#areas > div[data-id="' + argument + '"]').remove();
                if (options[argument].ownedBy != '' && parseInt(options[argument].canvas) > 0) {
                  if (parseInt(options[argument].fightType) === 1) {
                    var element = $(
                      '<div data-id="' +
                        argument +
                        '" area-block="1" class="peace"><a href="#" data-profile="" data-from-area="1" class="open-profile"></a></div>'
                    );
                  } else
                    var element = $(
                      '<div data-id="' +
                        argument +
                        '" area-block="1" class="peace"><a href="#" data-tag="" data-from-area="1" class="open-guild"></a></div>'
                    );
                  $('#areas').append(element);
                  parseInt(options[argument].fightType) === 1
                    ? element.find('a').attr('data-profile', options[argument].ownedBy)
                    : element.find('a').attr('data-tag', options[argument].ownedBy);
                  element
                    .find('a')
                    .css(
                      'background-image',
                      'url("/canvas/' + options[argument].canvas + '.png?v=' + nowSeconds() + '")'
                    );
                  element.css(
                    'top',
                    options[argument].yStart + (options[argument].yEnd - options[argument].yStart - 32) / 2
                  );
                  element.css(
                    'left',
                    options[argument].xStart + (options[argument].xEnd - options[argument].xStart - 32) / 2
                  );
                  element.css('width', 32);
                  element.css('height', 32);
                  element.show();
                }
              }
            }
            connection.io.on(
              'area_fight_start',
              /**
               * Registered area_fight_start callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: options[computed].fightEndAt, options[computed].nextFightAt, options[computed].fightType.
               *
               * Input bindings: areaFightStartPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (areaFightStartPayload) {
                if (serverData.painting.id !== 7) return;
                if (options[areaFightStartPayload.id] !== undefined) {
                  options[areaFightStartPayload.id].fightEndAt = areaFightStartPayload.fightEndAt;
                  options[areaFightStartPayload.id].nextFightAt = areaFightStartPayload.nextFightAt;
                  options[areaFightStartPayload.id].fightType = areaFightStartPayload.fightType;
                  var xStart =
                      options[areaFightStartPayload.id].xStart +
                      Math.round(
                        (options[areaFightStartPayload.id].xEnd - options[areaFightStartPayload.id].xStart) /
                          2
                      ),
                    yStart =
                      options[areaFightStartPayload.id].yStart +
                      Math.round(
                        (options[areaFightStartPayload.id].yEnd - options[areaFightStartPayload.id].yStart) /
                          2
                      ),
                    text = 'guild';
                  if (parseInt(areaFightStartPayload.fightType) === 1) {
                    text = 'player';
                    var messageData = {};
                    messageData.type = 'custom';
                    messageData.target = '';
                    messageData.color = 0;
                    messageData.mention = '';
                    messageData.username = '';
                    messageData.message =
                      'The <a href="#" class="go-to-coords" data-x="' +
                      xStart +
                      '" data-y="' +
                      yStart +
                      '" data-s="4" title="Click to view">' +
                      options[areaFightStartPayload.id].name +
                      '</a> ' +
                      text +
                      ' war has begun! (15% chance to win a <a href="#" class="open-item" data-item="13" style="color:#ffbe00;">[Treasure Chest]</a>)';
                    messageData.icons = [];
                    messageData.createdAt = '';
                    chat.addMessageRow(messageData, 'global');
                  } else {
                    var areaFightStartMessageData = {};
                    areaFightStartMessageData.type = 'custom';
                    areaFightStartMessageData.target = '';
                    areaFightStartMessageData.color = 0;
                    areaFightStartMessageData.mention = '';
                    areaFightStartMessageData.username = '';
                    areaFightStartMessageData.message =
                      'The <a href="#" class="go-to-coords" data-x="' +
                      xStart +
                      '" data-y="' +
                      yStart +
                      '" data-s="4" title="Click to view">' +
                      options[areaFightStartPayload.id].name +
                      '</a> ' +
                      text +
                      ' war has begun!';
                    areaFightStartMessageData.icons = [];
                    areaFightStartMessageData.createdAt = '';
                    chat.addMessageRow(areaFightStartMessageData, 'global');
                  }
                  callback(areaFightStartPayload.id);
                  if (!('Notification' in window)) {
                  } else if (Notification.permission === 'granted') {
                    {
                      const notification = new Notification(
                        'The ' + options[areaFightStartPayload.id].name + ' ' + text + ' war has begun!'
                      );
                    }
                  } else
                    Notification.permission !== 'denied' &&
                      Notification.requestPermission().then((argument) => {
                        if (argument === 'granted') {
                          const notification = new Notification(
                            'The ' + options[areaFightStartPayload.id].name + ' ' + text + ' war has begun!'
                          );
                        }
                      });
                }
              }
            );
            connection.io.on(
              'area_fight_end',
              /**
               * Registered area_fight_end callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: options[computed].fightEndAt, options[computed].nextFightAt, options[computed].ownedBy, options[computed].canvas, options[computed].fightType.
               *
               * Observed DOM operations: hide.
               *
               * Input bindings: areaFightEndPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (areaFightEndPayload) {
                if (serverData.painting.id !== 7) {
                  return;
                }
                if (options[areaFightEndPayload.id] !== undefined) {
                  options[areaFightEndPayload.id].fightEndAt = areaFightEndPayload.fightEndAt;
                  options[areaFightEndPayload.id].nextFightAt = areaFightEndPayload.nextFightAt;
                  options[areaFightEndPayload.id].ownedBy = areaFightEndPayload.ownedBy;
                  options[areaFightEndPayload.id].canvas = areaFightEndPayload.canvas;
                  options[areaFightEndPayload.id].fightType = areaFightEndPayload.fightType;
                  if (areaFightEndPayload.ownedBy != '') {
                    var xStart =
                        options[areaFightEndPayload.id].xStart +
                        Math.round(
                          (options[areaFightEndPayload.id].xEnd - options[areaFightEndPayload.id].xStart) / 2
                        ),
                      yStart =
                        options[areaFightEndPayload.id].yStart +
                        Math.round(
                          (options[areaFightEndPayload.id].yEnd - options[areaFightEndPayload.id].yStart) / 2
                        ),
                      text = 'guild',
                      areaFightEndText = 'tag',
                      aHrefClassOpenText = 'guild',
                      html = ' awarded';
                    if (parseInt(areaFightEndPayload.fightType) === 1) {
                      text = 'player';
                      areaFightEndText = 'profile';
                      aHrefClassOpenText = 'profile';
                      html =
                        ' and ' +
                        areaFightEndPayload.ores +
                        ' <a href="#" class="open-gold-rush">Gold ore' +
                        (parseInt(areaFightEndPayload.ores) != 1 ? 's' : '') +
                        '</a> awarded';
                    }
                    if (areaFightEndPayload.defended) {
                      var messageData = {};
                      messageData.type = 'custom';
                      messageData.target = '';
                      messageData.color = 0;
                      messageData.mention = '';
                      messageData.username = '';
                      messageData.message =
                        '<a href="#" class="open-' +
                        aHrefClassOpenText +
                        '" data-' +
                        areaFightEndText +
                        '="' +
                        areaFightEndPayload.ownedBy +
                        '">' +
                        areaFightEndPayload.ownedBy +
                        '</a> won the <a href="#" class="go-to-coords" data-x="' +
                        xStart +
                        '" data-y="' +
                        yStart +
                        '" data-s="4" title="Click to view">' +
                        options[areaFightEndPayload.id].name +
                        '</a> ' +
                        text +
                        ' war again! ' +
                        areaFightEndPayload.points +
                        ' ' +
                        text +
                        ' battle points (+5 bonus)' +
                        html;
                      messageData.icons = [];
                      messageData.createdAt = '';
                      chat.addMessageRow(messageData, 'global');
                    } else {
                      var areaFightEndMessageData = {};
                      areaFightEndMessageData.type = 'custom';
                      areaFightEndMessageData.target = '';
                      areaFightEndMessageData.color = 0;
                      areaFightEndMessageData.mention = '';
                      areaFightEndMessageData.username = '';
                      areaFightEndMessageData.message =
                        '<a href="#" class="open-' +
                        aHrefClassOpenText +
                        '" data-' +
                        areaFightEndText +
                        '="' +
                        areaFightEndPayload.ownedBy +
                        '">' +
                        areaFightEndPayload.ownedBy +
                        '</a> won the <a href="#" class="go-to-coords" data-x="' +
                        xStart +
                        '" data-y="' +
                        yStart +
                        '" data-s="4" title="Click to view">' +
                        options[areaFightEndPayload.id].name +
                        '</a> ' +
                        text +
                        ' war! ' +
                        areaFightEndPayload.points +
                        ' ' +
                        text +
                        ' battle points' +
                        html;
                      areaFightEndMessageData.icons = [];
                      areaFightEndMessageData.createdAt = '';
                      chat.addMessageRow(areaFightEndMessageData, 'global');
                    }
                    if (parseInt(areaFightEndPayload.fightType) === 1) {
                      var customTinyMessageData = {};
                      customTinyMessageData.type = 'custom-tiny';
                      customTinyMessageData.target = '';
                      customTinyMessageData.color = 0;
                      customTinyMessageData.mention = '';
                      customTinyMessageData.username = '';
                      customTinyMessageData.message =
                        '<div class="spacer-5"></div><b>' +
                        parseInt(areaFightEndPayload.total.pixels).toLocaleString('ru-RU') +
                        ' pixel' +
                        (parseInt(areaFightEndPayload.total.pixels) !== 1 ? 's' : '') +
                        ', ' +
                        areaFightEndPayload.total.users +
                        ' player' +
                        (parseInt(areaFightEndPayload.total.users) !== 1 ? 's' : '') +
                        '. Top 5 Players:</b>';
                      customTinyMessageData.icons = [];
                      customTinyMessageData.createdAt = '';
                      chat.addMessageRow(customTinyMessageData, 'global');
                    } else {
                      var divClassSpacerDivBMessageData = {};
                      divClassSpacerDivBMessageData.type = 'custom-tiny';
                      divClassSpacerDivBMessageData.target = '';
                      divClassSpacerDivBMessageData.color = 0;
                      divClassSpacerDivBMessageData.mention = '';
                      divClassSpacerDivBMessageData.username = '';
                      divClassSpacerDivBMessageData.message =
                        '<div class="spacer-5"></div><b>' +
                        parseInt(areaFightEndPayload.total.pixels).toLocaleString('ru-RU') +
                        ' pixel' +
                        (parseInt(areaFightEndPayload.total.pixels) !== 1 ? 's' : '') +
                        ', ' +
                        areaFightEndPayload.total.guilds +
                        ' guild' +
                        (parseInt(areaFightEndPayload.total.guilds) !== 1 ? 's' : '') +
                        ', ' +
                        areaFightEndPayload.total.users +
                        ' player' +
                        (parseInt(areaFightEndPayload.total.users) !== 1 ? 's' : '') +
                        '. Top 5 Guilds:</b>';
                      divClassSpacerDivBMessageData.icons = [];
                      divClassSpacerDivBMessageData.createdAt = '';
                      chat.addMessageRow(divClassSpacerDivBMessageData, 'global');
                    }
                    var count = 1;
                    for (var key in areaFightEndPayload.stats) {
                      if (parseInt(areaFightEndPayload.fightType) === 1) {
                        var username = areaFightEndPayload.stats[key].username;
                        if (areaFightEndPayload.stats[key].guild) {
                          username = '[' + areaFightEndPayload.stats[key].guild + '] ' + username;
                        }
                        var bAHrefClassOpenProfileDataMessageData = {};
                        bAHrefClassOpenProfileDataMessageData.type = 'custom-tiny';
                        bAHrefClassOpenProfileDataMessageData.target = '';
                        bAHrefClassOpenProfileDataMessageData.color = 0;
                        bAHrefClassOpenProfileDataMessageData.mention = '';
                        bAHrefClassOpenProfileDataMessageData.username = '';
                        bAHrefClassOpenProfileDataMessageData.message =
                          '<div class="spacer-10"></div><b>#' +
                          count +
                          '</b> <a href="#" class="open-profile" data-profile="' +
                          areaFightEndPayload.stats[key].username +
                          '">' +
                          username +
                          '</a> ' +
                          parseInt(areaFightEndPayload.stats[key].pixels).toLocaleString('ru-RU') +
                          ' pixel' +
                          (parseInt(areaFightEndPayload.stats[key].pixel) !== 1 ? 's' : '');
                        bAHrefClassOpenProfileDataMessageData.icons = [];
                        bAHrefClassOpenProfileDataMessageData.createdAt = '';
                        chat.addMessageRow(bAHrefClassOpenProfileDataMessageData, 'global');
                      } else {
                        var bAHrefClassOpenGuildDataMessageData = {};
                        bAHrefClassOpenGuildDataMessageData.type = 'custom-tiny';
                        bAHrefClassOpenGuildDataMessageData.target = '';
                        bAHrefClassOpenGuildDataMessageData.color = 0;
                        bAHrefClassOpenGuildDataMessageData.mention = '';
                        bAHrefClassOpenGuildDataMessageData.username = '';
                        bAHrefClassOpenGuildDataMessageData.message =
                          '<div class="spacer-10"></div><b>#' +
                          count +
                          '</b> <a href="#" class="open-guild" data-tag="' +
                          areaFightEndPayload.stats[key].guild +
                          '">' +
                          areaFightEndPayload.stats[key].guild +
                          '</a> ' +
                          parseInt(areaFightEndPayload.stats[key].pixels).toLocaleString('ru-RU') +
                          ' pixel' +
                          (parseInt(areaFightEndPayload.stats[key].pixel) !== 1 ? 's' : '') +
                          ', ' +
                          areaFightEndPayload.stats[key].users +
                          ' player' +
                          (parseInt(areaFightEndPayload.stats[key].users) !== 1 ? 's' : '') +
                          '';
                        bAHrefClassOpenGuildDataMessageData.icons = [];
                        bAHrefClassOpenGuildDataMessageData.createdAt = '';
                        chat.addMessageRow(bAHrefClassOpenGuildDataMessageData, 'global');
                      }
                      count++;
                    }
                    var customMessageData = {};
                    customMessageData.type = 'custom';
                    customMessageData.target = '';
                    customMessageData.color = 0;
                    customMessageData.mention = '';
                    customMessageData.username = '';
                    customMessageData.message =
                      'Next war starting in ' + areaFightEndPayload.nextFight / 60 + ' minutes';
                    customMessageData.icons = [];
                    customMessageData.createdAt = '';
                    chat.addMessageRow(customMessageData, 'global');
                  }
                  areaFightEndCallback(areaFightEndPayload.id);
                }
                $('#warTimer').hide();
              }
            );
            connection.io.on(
              'areas',
              /**
               * Registered areas callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: options.
               *
               * Input bindings: areasPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (areasPayload) {
                if (serverData.painting.id !== 7) return;
                options = areasPayload;
                for (var key in options) {
                  var stateData = areasPayload[key];
                  stateData.state === 1 ? callback(key) : areaFightEndCallback(key);
                }
              }
            );
            connection.io.on('coins.notification.gift', function (coinsNotificationGiftPayload) {
              var messageData = {};
              messageData.type = 'custom';
              messageData.target = '';
              messageData.color = 0;
              messageData.mention = '';
              messageData.username = '';
              messageData.message =
                '<a href="#" class="open-profile" data-profile="' +
                coinsNotificationGiftPayload.from +
                '">' +
                coinsNotificationGiftPayload.from +
                '</a> sent <div class="pp-coin-1"><img src="/img/pp-coin-still.gif" width="16"></div>' +
                coinsNotificationGiftPayload.amount +
                ' to <a href="#" class="open-profile" data-profile="' +
                coinsNotificationGiftPayload.to +
                '">' +
                coinsNotificationGiftPayload.to +
                '</a>';
              messageData.icons = [];
              messageData.createdAt = '';
              chat.addMessageRow(messageData, chat.selected);
            });
            connection.io.on(
              'hot.paintings',
              /**
               * Registered hot.paintings callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: html, element.css, element.attr, append, text, addClass.
               *
               * Input bindings: hotPaintingsPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (hotPaintingsPayload) {
                $('.paintings-list[data-id="featured"]').html('');
                for (var key in hotPaintingsPayload) {
                  var defaultColorData = hotPaintingsPayload[key];
                  if (defaultColorData.defaultColor === undefined) {
                    defaultColorData.defaultColor = 0;
                  }
                  defaultColorData.xMax === undefined && (defaultColorData.xMax = 200);
                  var text = '';
                  if (defaultColorData.access == '2' && parseInt(defaultColorData.guild) === 1) {
                    text = 'bg-guild';
                  } else if (defaultColorData.access == '2' && parseInt(defaultColorData.twitch) === 1)
                    text = 'bg-twitch';
                  else if (defaultColorData.access == '2') {
                    text = 'bg-approval';
                  } else defaultColorData.access == '3' && (text = 'bg-owner');
                  var hotPaintingsText = '';
                  if (
                    parseInt(defaultColorData.id) === 13 ||
                    (defaultColorData.nsfw && parseInt(defaultColorData.nsfw) === 1)
                  ) {
                    hotPaintingsText = 'blur-bg';
                  }
                  var element = $(
                    '<a href="/' +
                      defaultColorData.id +
                      '-' +
                      defaultColorData.slug +
                      '" class="' +
                      text +
                      ' ' +
                      hotPaintingsText +
                      '" style="background-color:' +
                      appState.painting.palette.colors[defaultColorData.defaultColor] +
                      '"><div class="featuredOnline"><div class="pulse-online-featured pulse-online"></div><span></span></div><div class="name"></div></a>'
                  );
                  element.css(
                    'background-image',
                    'url("canvas/' + defaultColorData.id + '.png?t=' + nowSeconds() + '")'
                  );
                  element.attr('title', defaultColorData.pixels + ' pixels placed');
                  $('.paintings-list[data-id="featured"]').append(element);
                  element.find('.name').text(defaultColorData.name);
                  element.find('.featuredOnline span').text(defaultColorData.online);
                  parseInt(defaultColorData.xMax) < 205 && element.find('img').addClass('pixelate');
                }
                var count = 0;
                count &&
                  (!serverData.user.connected ||
                    (serverData.user.connected &&
                      (parseInt(serverData.user.premium.expire_at) < nowSeconds() ||
                        !serverData.user.premium.active))) &&
                  $('.paintings-list[data-id="featured"]').append(
                    '<div><script type="text/javascript" src="//services.vlitag.com/adv1/?q=27546936fdc4110d04b58b19cd9d49f5" defer="" async=""></script><script> var vitag = vitag || {};</script></div><div class="absm"><div class="title">Advertising</div><div class="adsbyvli" style="width:320px; height:50px" data-ad-slot="vi_23510102705"></div> <script>(vitag.Init = window.vitag.Init || []).push(function () { viAPItag.display("vi_23510102705") })</script></div>'
                  );
              }
            );
            connection.io.on(
              'painting.players',
              /**
               * Registered painting.players callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: html, append, htmlElement.text, htmlElement.attr, htmlElement.css, text, show, hide.
               *
               * Input bindings: paintingPlayersPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (paintingPlayersPayload) {
                $('#onlineUsers .players-list').html('');
                for (var key in paintingPlayersPayload) {
                  var usernameData = paintingPlayersPayload[key],
                    htmlElement = $('<a href="#" class="open-profile player"  data-profile=""></a> ');
                  $('#onlineUsers .players-list').append(htmlElement);
                  htmlElement.text(usernameData.username);
                  htmlElement.attr('data-profile', usernameData.username.toLowerCase());
                  parseInt(usernameData.color) >= 0 &&
                    htmlElement.css('color', appState.painting.palette.colors[usernameData.color]);
                }
                $('#onlineUsers h1').text(serverData.painting.name);
                $('#onlineUsers p').text(serverData.painting.description);
                $('#onlineUsers .box-content-x > div').show();
                $('#onlineUsers .box-content-x > .loading').hide();
                $('#onlineUsers').show();
              }
            );
            connection.io.on(
              'user.profile',
              /**
               * Registered user.profile callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: css, hide, show, text, attr, removeClass, addClass, html (plus 1 other observed operations).
               *
               * Input bindings: userProfilePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (userProfilePayload) {
                var text = '';
                userProfilePayload.x > 0 &&
                  userProfilePayload.y > 0 &&
                  (text = '#x=' + userProfilePayload.x + '&y=' + userProfilePayload.y + '&s=3');
                if ($('#profile').css('display') !== 'none') {
                  var profileElement = $('#profile');
                  if (userProfilePayload.online) {
                    if (
                      parseInt(userProfilePayload.lastActivity) > 0 &&
                      parseInt(userProfilePayload.lastActivity) <= nowSeconds() - 300
                    ) {
                      profileElement.find('.profile-offline').hide();
                      profileElement.find('.profile-online').hide();
                      profileElement.find('.profile-away').show();
                      profileElement
                        .find('.painting')
                        .find('.pixelating')
                        .text(
                          'Away since ' +
                            formatElapsedTimeLong(
                              nowSeconds() - parseInt(userProfilePayload.lastActivity),
                              true
                            )
                        );
                      profileElement.find('.painting').find('.color-preview').hide();
                    } else {
                      profileElement.find('.profile-offline').hide();
                      profileElement.find('.profile-away').hide();
                      profileElement.find('.profile-online').show();
                      profileElement.find('.painting').find('.pixelating').text('Pixelating in');
                      profileElement
                        .find('.painting')
                        .find('.color-preview')
                        .css('background-color', appState.painting.palette.colors[userProfilePayload.color]);
                      profileElement.find('.painting').find('.color-preview').show();
                    }
                    profileElement.find('.painting span').show();
                    profileElement
                      .find('.painting')
                      .find('a')
                      .text('#' + userProfilePayload.painting + ' ' + userProfilePayload.name);
                    profileElement
                      .find('.painting')
                      .find('a')
                      .attr(
                        'href',
                        '/' + userProfilePayload.painting + '-' + userProfilePayload.slug + '' + text + ''
                      );
                    profileElement.find('.painting').show();
                  } else {
                    profileElement.find('.profile-offline').show();
                    profileElement.find('.profile-online').hide();
                  }
                } else if (userProfilePayload.online) {
                  var profileElement = $('#social table').find(
                    'tr[data-username="' + userProfilePayload.username.toLowerCase() + '"]'
                  );
                  profileElement.prependTo($('#social table'));
                  if (userProfilePayload.rainbow) {
                    profileElement
                      .find('td > a > span')
                      .removeClass('rainbowText')
                      .removeClass('xmasText')
                      .removeClass('halloween');
                    profileElement.find('td > a > span').addClass('rainbowText');
                  } else if (userProfilePayload.xmas) {
                    profileElement
                      .find('td > a > span')
                      .removeClass('rainbowText')
                      .removeClass('xmasText')
                      .removeClass('halloween');
                    profileElement.find('td > a > span').addClass('xmasText');
                    var html = holidayTextHtml(profileElement.find('td > a > span').text());
                    profileElement.find('td > a > span').html(html);
                  } else if (userProfilePayload.halloween) {
                    profileElement
                      .find('td > a > span')
                      .removeClass('rainbowText')
                      .removeClass('xmasText')
                      .removeClass('halloween');
                    profileElement.find('td > a > span').addClass('halloween');
                  } else
                    profileElement
                      .find('td > a > span')
                      .removeClass('rainbowText')
                      .removeClass('xmasText')
                      .removeClass('halloween');
                  var currentPaintingElementHtml = $(
                    '<div class="color-preview"></div><span> on</span> <a class="painting-link" href="#">#' +
                      userProfilePayload.painting +
                      '</a>'
                  );
                  profileElement.find('.current-painting').html(currentPaintingElementHtml);
                  profileElement
                    .find('.current-painting')
                    .find('.painting-link')
                    .text(userProfilePayload.name);
                  profileElement
                    .find('.current-painting')
                    .find('.painting-link')
                    .attr(
                      'href',
                      '/' + userProfilePayload.painting + '-' + userProfilePayload.slug + '' + text + ''
                    );
                  profileElement
                    .find('.current-painting')
                    .find('.painting-link')
                    .attr('title', '#' + userProfilePayload.painting + ' ' + userProfilePayload.name);
                  if (userProfilePayload.color < 0) {
                    profileElement.find('.current-painting').find('.color-preview').hide();
                    profileElement.find('.current-painting').find('span').text('On');
                  } else {
                    profileElement
                      .find('.current-painting')
                      .find('.color-preview')
                      .css('background-color', appState.painting.palette.colors[userProfilePayload.color]);
                  }
                  profileElement.find('.offline').removeClass('offline').addClass('online');
                  profileElement.attr('data-online', 1);
                  if ($('#social a[data-id="friends"]').hasClass('active')) {
                    var int = parseInt($('#social .tab-content tr[data-online="1"]').length);
                    $('#menu-buttons-right-bottom a[data-id="social"] .notification-bubble').text(int).show();
                  }
                }
              }
            );
            connection.io.on(
              'canvas.access.requested',
              /**
               * Registered canvas.access.requested callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: notificationBubbleElement.text, notificationBubbleElement.show, notificationBubbleElement.hide.
               *
               * Input bindings: canvasAccessRequestedPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (canvasAccessRequestedPayload) {
                var notificationBubbleElement = $(
                    '.open-modal[data-target="painting"][data-content="pending"]'
                  ).find('.notification-bubble'),
                  text = parseInt(canvasAccessRequestedPayload);
                if (text >= 99 || text == '99+') {
                  text = '99+';
                }
                notificationBubbleElement.text(text);
                text > 0 || text == '99+'
                  ? notificationBubbleElement.show()
                  : notificationBubbleElement.hide();
              }
            );
            connection.io.on(
              'reload',
              /**
               * Registered reload callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: connection.ignoreRedirectRequest.
               *
               * Scheduled work: setTimeout (4000 ms).
               */
              function () {
                !connection.ignoreRedirectRequest &&
                  ((connection.ignoreRedirectRequest = true),
                  showNotification(
                    'warning',
                    'Update required',
                    'The owner made some changes to the painting settings, reloading the page in a few seconds...'
                  ),
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000));
              }
            );
            connection.io.on(
              'cooldown',
              /**
               * Registered cooldown callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: canvasRenderer.cooldown.
               *
               * Input bindings: cooldownPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (cooldownPayload) {
                canvasRenderer.cooldown = parseInt(cooldownPayload);
                canvasRenderer.triggerCooldownPanel(true);
              }
            );
            connection.io.on(
              'cooldown_dot',
              /**
               * Registered cooldown_dot callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: canvasRenderer.cooldown.
               *
               * Input bindings: cooldownDotPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (cooldownDotPayload) {
                canvasRenderer.cooldown = parseInt(cooldownDotPayload);
                canvasRenderer.triggerCooldownPanel(true, true);
              }
            );
            connection.io.on('protection', function () {
              if (canvasRenderer.loaded) {
                var image = new Image();
                image.onload = function () {
                  canvasRenderer.element.ctx.protected.fillStyle = 'rgba(255, 255, 255, 0)';
                  canvasRenderer.element.ctx.protected.clearRect(
                    0,
                    0,
                    serverData.painting.width,
                    serverData.painting.height
                  );
                  canvasRenderer.element.ctx.protected.drawImage(image, 0, 0);
                  canvasRenderer.currentImgDataProtection = canvasRenderer.element.ctx.protected.getImageData(
                    0,
                    0,
                    serverData.painting.width,
                    serverData.painting.height
                  ).data;
                  if (serverData.user.settings.painting.isOwner) {
                    showNotification(
                      'success',
                      'Protection Update',
                      'Your last changes on painting protection has been successfully applied. RELOAD YOUR PAGE TO DISPLAY CHANGES'
                    );
                  }
                };
                if (serverData.painting.protection) {
                  var timestamp = nowMilliseconds();
                  image.src =
                    serverData.host.http + 'canvas/' + serverData.painting.id + 'p.png?t200000=' + timestamp;
                } else {
                }
              }
            });
            connection.io.on(
              'throw.error.special',
              /**
               * Registered throw.error.special callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: Cookies.remove.
               *
               * Scheduled work: setTimeout (1500 ms), setTimeout (4000 ms).
               *
               * Input bindings: throwErrorSpecialPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (throwErrorSpecialPayload) {
                if (parseInt(throwErrorSpecialPayload.id) === 42)
                  setTimeout(function () {
                    canvasRenderer.loadUserItems();
                  }, 1500);
                else if (parseInt(throwErrorSpecialPayload.id) === 43) {
                  connection.io.disconnect();
                  var pathData = {};
                  pathData.path = '';
                  Cookies.remove('authId', pathData);
                  alert(throwErrorSpecialPayload.message);
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000);
                }
              }
            );
            var enabled = false;
            connection.io.on(
              'throw.error',
              /**
               * Registered throw.error callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Direct network calls: GET /api/relog.php.
               *
               * Shared/receiver state written: enabled, serverData.painting.rate, imagePainter.rate, setIntervalResult.
               *
               * Observed DOM operations: Cookies.remove, html, text, show, hide, attr, css.
               *
               * Scheduled work: setTimeout (5000 ms), setTimeout (4000 ms), setTimeout (1000 ms), setTimeout (10000 ms).
               *
               * Input bindings: throwErrorPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (throwErrorPayload) {
                if (throwErrorPayload == 0) {
                  canvasRenderer.disconnectUser();
                  ui.openModal('auth', 'login');
                } else if (throwErrorPayload == 49) {
                  if (!enabled) {
                    enabled = true;
                    api.xhr.req(
                      'GET',
                      '/api/relog.php',
                      {},
                      true,
                      /**
                       * HTTP completion callback for /api/relog.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
                       *
                       * Outgoing socket event names: init.
                       *
                       * Scheduled work: setTimeout (1500 ms).
                       *
                       * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
                       */
                      function (success, response) {
                        var authKeyData = {};
                        authKeyData.authKey = Cookies.get('authKey');
                        authKeyData.authToken = Cookies.get('authToken');
                        authKeyData.authId = Cookies.get('authId');
                        authKeyData.boardId = serverData.painting.id;
                        connection.io.emit('init', authKeyData);
                        setTimeout(function () {
                          canvasRenderer.loadFriends();
                          chat.updateScroll(chat.selected, true);
                        }, 1500);
                      }
                    );
                  } else {
                    canvasRenderer.disconnectUser();
                    ui.openModal('auth', 'login');
                  }
                } else if (throwErrorPayload == 1) {
                  canvasRenderer.disconnectUser();
                  ui.openModal('auth', 'login');
                  connection.io.disconnect();
                  window.location.reload();
                  setTimeout(function () {
                    showNotification(
                      'warning',
                      'Warning',
                      'You have been disconnected, please refresh the page'
                    );
                  }, 5000);
                } else if (throwErrorPayload == 35) {
                  connection.io.disconnect();
                  var pathData = {};
                  pathData.path = '';
                  Cookies.remove('authId', pathData);
                  showNotification(
                    'error',
                    'Guild disbanded',
                    'Your guild leader has disbanded the guild, reloading the page in a few seconds..'
                  );
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000);
                } else if (throwErrorPayload == 44) {
                  setIntervalResult && clearInterval(setIntervalResult);
                  openCoinIsland(0);
                } else if (throwErrorPayload == 45) {
                  if (setIntervalResult) {
                    clearInterval(setIntervalResult);
                  }
                  openCoinIsland(1);
                } else if (throwErrorPayload == 46) {
                  setIntervalResult && clearInterval(setIntervalResult);
                  openCoinIsland(2);
                } else if (throwErrorPayload == 47) {
                  if (setIntervalResult) {
                    clearInterval(setIntervalResult);
                  }
                  openCoinIsland(3);
                } else if (throwErrorPayload == 36) {
                  connection.io.disconnect();
                  var throwErrorPathData = {};
                  throwErrorPathData.path = '';
                  Cookies.remove('authId', throwErrorPathData);
                  showNotification(
                    'error',
                    'Guild kick',
                    'You have been kicked from the guild, reloading the page in a few seconds..'
                  );
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000);
                } else if (throwErrorPayload == 40) {
                  connection.io.disconnect();
                  var pathPathData = {};
                  pathPathData.path = '';
                  Cookies.remove('authId', pathPathData);
                  setTimeout(function () {
                    window.location.reload();
                  }, 1000);
                } else if (throwErrorPayload == 39) {
                  connection.io.disconnect();
                  var throwErrorpathPathData = {};
                  throwErrorpathPathData.path = '';
                  Cookies.remove('authId', throwErrorpathPathData);
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000);
                } else if (throwErrorPayload == 41) {
                  connection.io.disconnect();
                  var localThrowErrorPathData = {};
                  localThrowErrorPathData.path = '';
                  Cookies.remove('authId', localThrowErrorPathData);
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000);
                } else if (throwErrorPayload == 37) {
                  connection.io.disconnect();
                  var localPathPathData = {};
                  localPathPathData.path = '';
                  Cookies.remove('authId', localPathPathData);
                  setTimeout(function () {
                    window.location.reload();
                  }, 4000);
                } else if (throwErrorPayload == 38) {
                } else if (throwErrorPayload == 2) {
                  ui.closeModal();
                  ui.openModal('username', 'username');
                } else if (throwErrorPayload == 10) {
                  var boxContentElement = $('.box[data-id="request-access"]').find(
                    '.box-content[data-id="request"]'
                  );
                  if (parseInt(serverData.painting.id) === 8) {
                    boxContentElement
                      .find('.managers .owner')
                      .html('Pixelplace Moderators (Do not ping/contact admin)');
                  } else {
                    boxContentElement
                      .find('.managers .owner')
                      .html(
                        '<a href="#" class="open-profile" data-profile="' +
                          serverData.painting.owner.name.toLowerCase() +
                          '">' +
                          serverData.painting.owner.name +
                          '</a>'
                      );
                  }
                  if (serverData.painting.moderators.length > 0) {
                    var entries = [];
                    for (var key in serverData.painting.moderators) {
                      entries.push(
                        '<a href="#" class="open-profile" data-profile="' +
                          serverData.painting.moderators[key].name.toLowerCase() +
                          '">' +
                          serverData.painting.moderators[key].name +
                          '</a>'
                      );
                    }
                    boxContentElement.find('.managers .moderators').html(entries.join(', '));
                  }
                  if (serverData.painting.rules != '') {
                    boxContentElement.find('.rules p').text(serverData.painting.rules);
                    boxContentElement.find('.rules').show();
                  } else boxContentElement.find('.rules').hide();
                  serverData.painting.guild.integration
                    ? (boxContentElement.find('.guild-form-info').hide(),
                      boxContentElement.find('.guild-form').show(),
                      boxContentElement.find('.guild-link').text(serverData.painting.guild.name),
                      boxContentElement.find('.guild-link').attr('data-tag', serverData.painting.guild.name))
                    : (boxContentElement.find('.guild-form-info').show(),
                      boxContentElement.find('.guild-form').hide());
                  if (serverData.painting.twitch.integration) {
                    boxContentElement.find('.twitch-form-info').css('display', 'none!important');
                    boxContentElement.find('.twitch-form').show();
                    boxContentElement
                      .find('.twitch-link')
                      .text('twitch.tv/' + serverData.painting.twitch.name);
                    boxContentElement
                      .find('.twitch-link')
                      .attr('href', 'https://twitch.tv/' + serverData.painting.twitch.name);
                  } else {
                    boxContentElement.find('.twitch-form-info').css('display', 'block!important');
                    boxContentElement.find('.twitch-form').hide();
                  }
                  ui.openModal('request-access', 'request');
                } else if (throwErrorPayload == 11) {
                  if (serverData.painting.rate < 100) {
                    serverData.painting.rate += 10;
                    if (imagePainter && imagePainter.rate && serverData.painting.rate > imagePainter.rate) {
                      imagePainter.rate = serverData.painting.rate;
                      if (imagePainter.started) {
                      }
                    }
                    setIntervalResult !== null &&
                      (clearInterval(setIntervalResult), (setIntervalResult = null));
                  }
                } else if (throwErrorPayload == 30) ui.openModal('main', 'guilds');
                else if (throwErrorPayload == 15) {
                  showNotification(
                    'error',
                    'Error',
                    'You have too many instances of pixelplace.io opened, please close some. If you are using a proxy or shared connection, you may need to switch to a private one'
                  );
                  connection.io.disconnect();
                  setTimeout(function () {
                    connection.io.connect();
                  }, 4000);
                } else if (throwErrorPayload == 16) {
                  showNotification(
                    'error',
                    'Error',
                    'Too many users share your internet connection, please consider switching to a private network (are you  using a proxy ?)'
                  );
                  connection.io.disconnect();
                  setTimeout(function () {
                    connection.io.connect();
                  }, 4000);
                } else if (throwErrorPayload == 17) {
                  showNotification(
                    'error',
                    'Error',
                    'Pixelplace.io has been disabled for your internet connection (are you  using a proxy ?)'
                  );
                  connection.io.disconnect();
                } else if (throwErrorPayload == 18) {
                  showNotification('error', 'Error', "Servers full ! Please wait.. (don't refresh the page)");
                  connection.io.disconnect();
                  setTimeout(function () {
                    connection.io.connect();
                  }, 10000);
                } else if (throwErrorPayload == 19) {
                  connection.io.disconnect();
                  window.location.reload();
                } else if (throwErrorPayload == 23) {
                  ui.openModal('queue', 'queue');
                } else showNotification('error', 'Error', connection.errors[throwErrorPayload]);
              }
            );
            connection.io.on(
              'queue',
              /**
               * Registered queue callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Observed DOM operations: text.
               *
               * Input bindings: queuePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (queuePayload) {
                var time = parseInt(queuePayload.time),
                  text = '';
                if (time > 60) text = parseInt(time / 60) + ' min';
                else time === 0 ? (text = 'Loading...') : (text = 'Less than 1 min');
                $('#modals .box-content[data-id="queue"]').find('.position').text(queuePayload.position);
                $('#modals .box-content[data-id="queue"]').find('.time').text(text);
                if (parseInt(queuePayload.position) <= 0) {
                  ui.selectors.content === 'queue' && ui.closeModal();
                }
              }
            );
            connection.io.on(
              'save.tracking.cache',
              /**
               * Registered save.tracking.cache callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: trackingSnapshotAt.
               *
               * Input bindings: saveTrackingCachePayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (saveTrackingCachePayload) {
                trackingSnapshotAt = parseInt(saveTrackingCachePayload);
              }
            );
            connection.io.on(
              'save.tracking.pending',
              /**
               * Registered save.tracking.pending callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: historyPlayback.names[computed].
               *
               * Scheduled work: setTimeout (3000 ms).
               *
               * Input bindings: saveTrackingPendingPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (saveTrackingPendingPayload) {
                if (saveTrackingPendingPayload === 'error')
                  setTimeout(function () {
                    window.location.reload();
                  }, 3000);
                else {
                  for (var key in saveTrackingPendingPayload.pixels) {
                    historyPlayback.pixels.push(saveTrackingPendingPayload.pixels[key]);
                  }
                  for (var key in saveTrackingPendingPayload.names) {
                    historyPlayback.names[key] = saveTrackingPendingPayload.names[key];
                  }
                  setPaintingLoading(false);
                  startHistoryPlayback();
                }
              }
            );
            connection.io.on(
              'premium.mod',
              /**
               * Registered premium.mod callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: serverData.user.premium.active, serverData.user.premium.expire_at.
               *
               * Input bindings: premiumModPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (premiumModPayload) {
                serverData.user.premium.active = true;
                serverData.user.premium.expire_at = nowSeconds() + 604800;
              }
            );
            /* Server pixel batches are rendered only after any image resources required by their commands have been loaded. */
            connection.io.on(
              'canvas',
              /**
               * Registered canvas callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
               *
               * Shared/receiver state written: connection.canvas, connection.pending.
               *
               * Observed DOM operations: hide.
               *
               * Scheduled work: setInterval (300000 ms), setTimeout (5000 ms).
               *
               * Input bindings: canvasPayload. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (canvasPayload) {
                for (var key in canvasPayload) {
                  canvasRenderer.drawPixelAt(
                    true,
                    canvasPayload[key][0],
                    canvasPayload[key][1],
                    canvasPayload[key][2],
                    canvasPayload[key][3]
                  );
                }
                connection.canvas = true;
                for (var key in connection.pending) {
                  var canvasPayload = connection.pending[key];
                  canvasRenderer.drawPixelAt(
                    true,
                    canvasPayload[0],
                    canvasPayload[1],
                    canvasPayload[2],
                    canvasPayload[3]
                  );
                }
                connection.pending = [];
                setInterval(
                  /**
                   * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                   *
                   * Direct network calls: GET /api/ping.php.
                   */
                  function () {
                    if (localStorage) {
                      var enabled = false,
                        lastPing = localStorage.getItem('lastPing');
                      if (lastPing !== null) {
                        if (parseInt(lastPing) < nowSeconds() - 280) {
                          enabled = true;
                        }
                      } else {
                        enabled = true;
                      }
                      enabled &&
                        (localStorage.setItem('lastPing', nowSeconds()),
                        api.xhr.req('GET', '/api/ping.php', {}, true, function (success, response) {
                          !success && localStorage.setItem('lastPing', 0);
                        }));
                    }
                    sessionStartedAt < nowSeconds() - 561600 && window.location.reload();
                  },
                  300000
                );
                setPaintingLoading(false);
                !localStorage || !localStorage.getItem('attention-notif')
                  ? setTimeout(
                      /**
                       * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                       *
                       * Shared/receiver state written: paintingReloadInterval.
                       *
                       * Observed DOM operations: show, css.
                       *
                       * Scheduled work: setInterval (5000 ms).
                       */
                      function () {
                        $('.attention').show();
                        $('.attention').css('animation', 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both');
                        paintingReloadInterval = setInterval(
                          /**
                           * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                           *
                           * Observed DOM operations: css.
                           *
                           * Scheduled work: setTimeout (1000 ms).
                           */
                          function () {
                            $('.attention').css('animation', 'none');
                            setTimeout(
                              /**
                               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
                               *
                               * Observed DOM operations: css.
                               */
                              function () {
                                $('.attention').css(
                                  'animation',
                                  'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
                                );
                              },
                              1000
                            );
                          },
                          5000
                        );
                      },
                      5000
                    )
                  : $('.attention').hide();
              }
            );
            connection.io.on('p', function (pPayload) {
              if (!connection.canvas) {
                for (var key in pPayload) {
                  connection.pending.push(pPayload[key]);
                }
              } else
                for (var key in pPayload) {
                  canvasRenderer.drawPixelAt(
                    true,
                    pPayload[key][0],
                    pPayload[key][1],
                    pPayload[key][2],
                    pPayload[key][3],
                    pPayload[key][4]
                  );
                }
            });
          }
        }
      }
      var imageDragPosition = {};
      imageDragPosition.x = 0;
      imageDragPosition.y = 0;
      imageDragPosition.dragging = false;
      var imageSizeLimits = {};
      imageSizeLimits.current = 100;
      imageSizeLimits.min = 10;
      imageSizeLimits.max = 500;
      imageSizeLimits.processing = false;
      imageSizeLimits.init = null;
      imagePainter = {
        status: 1,
        version: 3,
        started: false,
        lastTime: 0,
        count: 0,
        data: {},
        x: 0,
        y: 0,
        rate: 20,
        position: imageDragPosition,
        size: imageSizeLimits,
        image: null,
        canvas: null,
        ctx: null,
        colors: {},
        rgb: {},
        rgbs: [],
        methods: ['', 'standard', 'FloydSteinberg', 'Stucki', 'Atkinson'],
        method: 1,
        /**
         * Shared/receiver state written: imagePainter.canvas.height, imagePainter.canvas.width, imagePainter.size.processing.
         *
         * Observed DOM operations: hide.
         *
         * Scheduled work: setTimeout (1 ms).
         */
        resize: function () {
          if (imagePainter.image) {
            $('#pb_preview').hide();
            imagePainter.canvas.height = Math.round(
              imagePainter.image.height * (imagePainter.size.current / imagePainter.image.width)
            );
            imagePainter.canvas.width = imagePainter.size.current;
            var image = imagePainter.image;
            image.width = imagePainter.canvas.width;
            image.height = imagePainter.canvas.height;
            imagePainter.ctx.drawImage(image, 0, 0, imagePainter.canvas.width, imagePainter.canvas.height);
            setTimeout(
              /**
               * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
               *
               * Observed DOM operations: text, css, hide, show.
               */
              function () {
                if (imagePainter.method === 0) {
                  var imageData = imagePainter.ctx.getImageData(
                      0,
                      0,
                      imagePainter.canvas.width - 4,
                      imagePainter.canvas.height - 4
                    ),
                    processedImageData = imageData,
                    dataLength = processedImageData.data.length;
                  $('.pb_loading span').text(dataLength + ' pixels');
                  for (var index = 0; index < dataLength; index += 4) {
                    if (imageData.data[index + 3] > 0) {
                      var nearestColor = findNearestPaletteColor([
                        imageData.data[index],
                        imageData.data[index + 1],
                        imageData.data[index + 2]
                      ]);
                      nearestColor &&
                        ((nearestColor = nearestColor.rgb),
                        (processedImageData.data[index] = nearestColor[0]),
                        (processedImageData.data[index + 1] = nearestColor[1]),
                        (processedImageData.data[index + 2] = nearestColor[2]),
                        (processedImageData.data[index + 3] = 255));
                    }
                  }
                  imagePainter.ctx.clearRect(
                    0,
                    0,
                    imagePainter.canvas.width - 2,
                    imagePainter.canvas.height - 2
                  );
                  imagePainter.ctx.putImageData(processedImageData, 0, 0);
                } else if (imagePainter.method > 0) {
                  $('.pb_loading span').text('pixels');
                  var quantizerOptions = {};
                  quantizerOptions.colors = imagePainter.rgbs.length;
                  quantizerOptions.palette = imagePainter.rgbs;
                  quantizerOptions.reIndex = false;
                  quantizerOptions.dithKern =
                    imagePainter.methods[imagePainter.method] === 'standard'
                      ? ''
                      : imagePainter.methods[imagePainter.method];
                  quantizerOptions.dithDelta = 0.05;
                  quantizerOptions.useCache = false;
                  quantizerOptions.colorDist = 'euclidean';
                  var rgbQuant = new RgbQuant(quantizerOptions),
                    generatedPalette = rgbQuant.palette(),
                    imagePainterCtxCreateImageData = imagePainter.ctx.createImageData(
                      imagePainter.canvas.width,
                      imagePainter.canvas.height
                    );
                  imagePainterCtxCreateImageData.data.set(rgbQuant.reduce(imagePainter.canvas));
                  imagePainter.ctx.clearRect(0, 0, imagePainter.canvas.width, imagePainter.canvas.height);
                  imagePainter.ctx.putImageData(imagePainterCtxCreateImageData, 0, 0);
                }
                var width = imagePainter.canvas.width + 4,
                  height = Math.round(imagePainter.image.height * (width / imagePainter.image.width));
                $('.pb_preview').css('width', width + 'px');
                $('.pb_preview').css('height', height + 'px');
                $('.pb_loading').hide();
                $('#pb_preview').show();
              },
              1
            );
          } else $('.pb_loading').hide();
          imagePainter.size.processing = false;
        }
      };
      /**
       * Shared/receiver state written: imagePainter.started, imagePainter.count.
       *
       * Observed DOM operations: html.
       *
       * Scheduled work: setTimeout (1 ms).
       */
      function toggleImagePainterPreview() {
        if ($('.pb_preview').length) {
          imagePainter.started = false;
          imagePainter.count = 0;
          $('.pb_bot').html('');
        } else {
          $('.pb_bot').html(
            '<div class="pb_preview"><canvas id="pb_preview" width="0" height="0" class="pixelate"></canvas><div class="pb_loading">Processing <span></span>...</div><a hre="#" class="pb_resize base-btn"><img src="img/icons/arrows-diagonal-2.svg" width="10"></a><a hre="#" class="base-btn pb_file_trigger"><img src="img/icons/file-plus.svg" width="10"></a><a hre="#" class="base-btn pb_control"><img src="img/icons/play.svg" width="15" class="pb_start"><img src="img/icons/stop.svg" width="15" class="pb_stop"></a><a hre="#" class="base-btn pb_method"><img src="img/icons/filter.svg" width="15"></a><input type="file" class="base-btn pb_file" name="pb_img"></div>'
          );
          setTimeout(
            /**
             * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
             *
             * Shared/receiver state written: imagePainter.position.x, imagePainter.position.y, imagePainter.canvas, imagePainter.ctx.
             *
             * Observed DOM operations: css, hide.
             */
            function () {
              var paintingPosition = pointer.screenToPaintingSpace(
                parseInt(window.innerWidth / 2),
                parseInt(window.innerHeight / 2)
              );
              imagePainter.position.x = parseInt(paintingPosition.x);
              imagePainter.position.y = parseInt(paintingPosition.y);
              $('.pb_bot').css(
                'webkitTransform',
                'translate(' + imagePainter.position.x + 'px, ' + imagePainter.position.y + 'px)'
              );
              $('.pb_bot').css(
                'transform',
                'translate(' + imagePainter.position.x + 'px, ' + imagePainter.position.y + 'px)'
              );
              imagePainter.canvas = document.getElementById('pb_preview');
              imagePainter.ctx = imagePainter.canvas.getContext('2d');
              $('.pb_loading').hide();
              $('#pb_preview').hide();
              canvasRenderer.centerPositionTo(3);
            },
            1
          );
        }
      }
      imagePainter.premium = {};
      for (var itemKey in appState.painting.palette.premium) {
        imagePainter.premium[appState.painting.palette.premium[itemKey].toUpperCase()] = 1;
      }
      for (var itemKey in appState.painting.palette.colors) {
        if (
          !serverData.user.premium.active &&
          imagePainter.premium[appState.painting.palette.colors[itemKey].toUpperCase()] !== undefined
        ) {
        } else {
          imagePainter.colors[itemKey] = {
            rgb: 0,
            hex: appState.painting.palette.colors[itemKey].toUpperCase()
          };
          var rgb = hexToRgb(imagePainter.colors[itemKey].hex);
          imagePainter.rgb[rgb[0] + '-' + rgb[1] + '-' + rgb[2]] = parseInt(itemKey);
          imagePainter.colors[itemKey].rgb = rgb;
          imagePainter.rgbs.push(rgb);
        }
      }
      delete imagePainter.premium;
      var imageDragOptions = {};
      imageDragOptions.inertia = false;
      imageDragOptions.onstart = function (unusedEvent) {
        !imagePainter.started && (imagePainter.position.dragging = true);
      };
      /**
       * Shared/receiver state written: imagePainter.position.x, imagePainter.position.y.
       *
       * Observed DOM operations: css.
       *
       * Input bindings: gesture. Names describe inferred roles; protocol field names are preserved separately.
       */
      imageDragOptions.onmove = function (gesture) {
        if (!imagePainter.started) {
          imagePainter.position.x += gesture.dx / canvasRenderer.scale;
          imagePainter.position.y += gesture.dy / canvasRenderer.scale;
          $('.pb_bot').css(
            'webkitTransform',
            'translate(' + imagePainter.position.x + 'px, ' + imagePainter.position.y + 'px)'
          );
          $('.pb_bot').css(
            'transform',
            'translate(' + imagePainter.position.x + 'px, ' + imagePainter.position.y + 'px)'
          );
        }
      };
      /**
       * Shared/receiver state written: imagePainter.position.x, imagePainter.position.y, imagePainter.position.dragging, imagePainter.x, imagePainter.y.
       *
       * Observed DOM operations: css.
       *
       * Input bindings: unusedEvent. Names describe inferred roles; protocol field names are preserved separately.
       */
      imageDragOptions.onend = function (unusedEvent) {
        if (!imagePainter.started) {
          imagePainter.position.x = parseInt(imagePainter.position.x);
          imagePainter.position.y = parseInt(imagePainter.position.y);
          $('.pb_bot').css(
            'webkitTransform',
            'translate(' + imagePainter.position.x + 'px, ' + imagePainter.position.y + 'px)'
          );
          $('.pb_bot').css(
            'transform',
            'translate(' + imagePainter.position.x + 'px, ' + imagePainter.position.y + 'px)'
          );
          imagePainter.position.dragging = false;
          var paintingPosition = pointer.screenToPaintingSpace(
            parseInt($('#pb_preview')[0].getBoundingClientRect().left),
            parseInt($('#pb_preview')[0].getBoundingClientRect().top)
          );
          paintingPosition.x |= 0;
          paintingPosition.y |= 0;
          if (
            paintingPosition.x < 0 ||
            paintingPosition.x > canvasRenderer.width - 1 ||
            paintingPosition.y < 0 ||
            paintingPosition.y > canvasRenderer.height - 1
          ) {
            imagePainter.x = null;
            imagePainter.y = null;
          } else {
            imagePainter.x = paintingPosition.x + 1;
            imagePainter.y = paintingPosition.y + 1;
          }
        }
      };
      interact('.pb_bot').styleCursor(false).draggable(imageDragOptions);
      $(document).on(
        'click',
        '.pb_method',
        /**
         * Registered click callback delegated to ".pb_method". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: imagePainter.method.
         *
         * Observed DOM operations: show, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          $('.pb_loading').show();
          $('#pb_preview').hide();
          imagePainter.methods[imagePainter.method + 1] !== undefined
            ? (imagePainter.method++,
              imagePainter.resize(),
              showNotification(
                'success',
                'Applying ' +
                  (imagePainter.method === 0 ? 'default' : imagePainter.methods[imagePainter.method]) +
                  ' filtering method...',
                ''
              ))
            : ((imagePainter.method = 1),
              imagePainter.resize(),
              showNotification(
                'success',
                'Applying ' +
                  (imagePainter.method === 0 ? 'default' : imagePainter.methods[imagePainter.method]) +
                  ' filtering method...',
                ''
              ));
        }
      );
      /**
       * Advance the image-painting cursor, skip eligible transparent/unchanged source pixels, and use the normal placement entry point. Source image offsets, target painting offsets and palette indices remain distinct quantities.
       *
       * Shared/receiver state written: imagePainter.count, imageColumnOffset, paintingElements, digitLetterTable, imagePainter.started.
       *
       * Observed DOM operations: show, hide.
       */
      /* Skip transparent source pixels and place the next eligible image pixel through the normal painting path. */
      function placeNextImagePixel() {
        while (
          imagePainter.data[imagePainter.count + 2] !== undefined &&
          imagePainter.data[imagePainter.count + 3] <= 0
        ) {
          imagePainter.count += 4;
        }
        var enabled = false;
        if (imagePainter.data[imagePainter.count + 2] !== undefined) {
          var searchingImagePixels = true;
          while (searchingImagePixels) {
            if (imagePainter.data[imagePainter.count + 2] !== undefined) {
              imageColumnOffset = (imagePainter.count / 4) % imagePainter.canvas.width;
              paintingElements = Math.floor(imagePainter.count / 4 / imagePainter.canvas.width);
              digitLetterTable = canvasRenderer.element.ctx.painting.getImageData(
                imagePainter.x + imageColumnOffset,
                imagePainter.y + paintingElements,
                1,
                1
              ).data;
              if (digitLetterTable[0] === 204 && digitLetterTable[1] === 204 && digitLetterTable[2] === 204)
                imagePainter.count += 4;
              else
                digitLetterTable[0] === imagePainter.data[imagePainter.count] &&
                digitLetterTable[1] === imagePainter.data[imagePainter.count + 1] &&
                digitLetterTable[2] === imagePainter.data[imagePainter.count + 2]
                  ? (imagePainter.count += 4)
                  : (searchingImagePixels = false);
            } else {
              searchingImagePixels = false;
              enabled = true;
              break;
            }
          }
          !enabled &&
            canvasRenderer.drawPixelAt(
              false,
              imagePainter.x + imageColumnOffset,
              imagePainter.y + paintingElements,
              imagePainter.rgb[
                imagePainter.data[imagePainter.count] +
                  '-' +
                  imagePainter.data[imagePainter.count + 1] +
                  '-' +
                  imagePainter.data[imagePainter.count + 2]
              ],
              1,
              undefined,
              true
            );
        } else enabled = true;
        if (enabled) {
          imagePainter.started = false;
          imagePainter.count = 0;
          $('.pb_control .pb_start').show();
          $('.pb_control .pb_stop').hide();
          showNotification('warning', 'Bot stopped', '');
        }
      }
      /**
       * Schedule the next image-painting step using the original rate and cooldown checks. The started flag is read again for rescheduling, which allows stop/reset actions to halt the loop without inventing an acknowledgement.
       *
       * Shared/receiver state written: imagePainter.lastTime, imagePainter.count.
       *
       * Scheduled work: requestAnimationFrame.
       *
       * Input bindings: frameTime. Names describe inferred roles; protocol field names are preserved separately.
       */
      /* Throttle image placement using the server-provided rate and the client cooldown before scheduling another frame. */
      function renderImagePainterFrame(frameTime) {
        if (frameTime - imagePainter.lastTime >= imagePainter.rate) {
          if (canvasRenderer.cooldown === 0 || canvasRenderer.cooldown < nowMilliseconds()) {
            imagePainter.lastTime = frameTime;
            placeNextImagePixel();
            imagePainter.count += 4;
          }
        }
        imagePainter.started && window.requestAnimationFrame(renderImagePainterFrame);
      }
      $(document).on(
        'click',
        '.pb_control',
        /**
         * Registered click callback delegated to ".pb_control". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Direct network calls: GET /api/get-bot.php.
         *
         * Shared/receiver state written: imagePainter.started, imagePainter.count.
         *
         * Observed DOM operations: show, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (imagePainter.started) {
            imagePainter.started = false;
            imagePainter.count = 0;
            $('.pb_control .pb_start').show();
            $('.pb_control .pb_stop').hide();
            showNotification('warning', 'Bot stopped', '');
          } else if (imagePainter.image)
            api.xhr.req(
              'GET',
              '/api/get-bot.php',
              {},
              true,
              /**
               * HTTP completion callback for /api/get-bot.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: imagePainter.count, imagePainter.data, imagePainter.started, imagePainter.lastTime.
               *
               * Observed DOM operations: hide, show.
               *
               * Scheduled work: requestAnimationFrame.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                if (success) {
                  if (parseInt(response.status) === 0)
                    showNotification('error', 'Session expired', 'Please refresh your page');
                  else if (parseInt(response.status) === 2)
                    showNotification(
                      'error',
                      'BOT Maintenance',
                      'Please try again later, sorry for the inconvenience'
                    );
                  else if (parseInt(response.version) > imagePainter.version) {
                    showNotification('error', 'BOT outdated', 'Please refresh your page to update the BOT');
                  } else if (!window.requestAnimationFrame)
                    showNotification(
                      'error',
                      'Browser not supported',
                      'Please download a recent version or Chrome, Firefox or Safari'
                    );
                  else
                    !imagePainter.status
                      ? showNotification(
                          'error',
                          'BOT Maintenance',
                          'Please try again later, sorry for the inconvenience.'
                        )
                      : ($('.pb_control .pb_start').hide(),
                        $('.pb_control .pb_stop').show(),
                        (imagePainter.count = 0),
                        (imagePainter.data = imagePainter.ctx.getImageData(
                          0,
                          0,
                          imagePainter.canvas.width,
                          imagePainter.canvas.height
                        ).data),
                        (imagePainter.started = true),
                        (imagePainter.lastTime = 0),
                        window.requestAnimationFrame(renderImagePainterFrame),
                        showNotification('success', 'Bot started!', ''));
                } else {
                  showNotification('error', 'Error', response.message);
                }
              }
            );
          else {
            $('.pb_file').click();
          }
        }
      );
      $(document).on(
        'pointerdown',
        '.pb_resize',
        /**
         * Registered pointerdown callback delegated to ".pb_resize". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: imagePainter.size.processing, imagePainter.size.init.
         *
         * Observed DOM operations: css, hide.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          event.preventDefault();
          if (imagePainter.size.processing === false) {
            if (imagePainter.image) {
              imagePainter.size.processing = true;
              imagePainter.size.init = parseInt($('.pb_preview').css('width'));
              $('#pb_preview').hide();
            } else {
              $('.pb_file').click();
            }
          }
        }
      );
      $(document).on(
        'pointermove',
        /**
         * Registered pointermove callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Observed DOM operations: css.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (imagePainter.size.processing) {
            if (imagePainter.image) {
              var windowX =
                (pointer.window.x - parseInt($('.pb_bot')[0].getBoundingClientRect().left)) /
                canvasRenderer.scale;
              if (windowX > imagePainter.size.max) windowX = imagePainter.size.max;
              else windowX < imagePainter.size.min && (windowX = imagePainter.size.min);
              var height = imagePainter.image.height * (windowX / imagePainter.image.width);
              $('.pb_preview').css('width', windowX + 'px');
              $('.pb_preview').css('height', height + 'px');
            }
          }
        }
      );
      $(document).on(
        'pointerup',
        /**
         * Registered pointerup callback. It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: imagePainter.size.current.
         *
         * Observed DOM operations: css, show.
         *
         * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (event) {
          if (imagePainter.size.processing) {
            event.preventDefault();
            var previewWidth = parseInt($('.pb_preview').css('width'));
            imagePainter.size.current = previewWidth - 8;
            if (imagePainter.size.current > imagePainter.size.max)
              imagePainter.size.current = imagePainter.size.max;
            else if (imagePainter.size.current < imagePainter.size.min) {
              imagePainter.size.current = imagePainter.size.min;
            }
            $('.pb_loading').show();
            imagePainter.resize();
          }
        }
      );
      $(document).on('click', '.pb_file_trigger', function (event) {
        event.preventDefault();
        $('.pb_file').click();
      });
      $(document).on(
        'change',
        'input[name="pb_img"]',
        /**
         * Registered change callback delegated to "input[name=\"pb_img\"]". It reads the current shared state when the event arrives; registration does not execute the callback body.
         *
         * Shared/receiver state written: imagePainter.started, imagePainter.count.
         *
         * Observed DOM operations: show, hide.
         */
        function () {
          var files = $('input[name="pb_img"]')[0].files;
          if (files !== undefined && files[0] !== undefined) {
            imagePainter.started &&
              ((imagePainter.started = false), showNotification('warning', 'Bot stopped', ''));
            imagePainter.count = 0;
            $('.pb_control .pb_start').show();
            $('.pb_control .pb_stop').hide();
            $('.pb_loading').show();
            $('#pb_preview').hide();
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
              var image = new Image();
              image.onload = function (unusedLoadEvent) {
                imagePainter.image = image;
                imagePainter.size.current = imagePainter.image.width;
                if (imagePainter.size.current > imagePainter.size.max) {
                  imagePainter.size.current = 100;
                } else if (imagePainter.size.current < imagePainter.size.min) {
                  imagePainter.size.current = imagePainter.size.min;
                }
                imagePainter.resize();
              };
              image.onerror = function () {
                alert('Image processing error (#1)', 'Error');
              };
              image.src = event.currentTarget.result;
            };
            fileReader.readAsDataURL(files[0]);
          } else $('.pb_loading').hide();
        }
      );
      /**
       * Calculate the original perceptual distance from Lab lightness/chroma/hue terms. Intermediate normalization and negative-roundoff handling are retained; simplifying them to raw RGB distance would change palette selection.
       *
       * Input bindings: firstRgb, secondRgb. Names describe inferred roles; protocol field names are preserved separately.
       */
      /* Compare Lab lightness, chroma, and hue rather than raw RGB distance. */
      function colorDifference(firstRgb, secondRgb) {
        var lab = rgbToLab(firstRgb),
          rgbToLabLab = rgbToLab(secondRgb),
          deltaLightness = lab[0] - rgbToLabLab[0],
          deltaA = lab[1] - rgbToLabLab[1],
          deltaB = lab[2] - rgbToLabLab[2],
          firstChroma = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]),
          secondChroma = Math.sqrt(rgbToLabLab[1] * rgbToLabLab[1] + rgbToLabLab[2] * rgbToLabLab[2]),
          deltaChroma = firstChroma - secondChroma,
          deltaHueSquared = deltaA * deltaA + deltaB * deltaB - deltaChroma * deltaChroma;
        deltaHueSquared = deltaHueSquared < 0 ? 0 : Math.sqrt(deltaHueSquared);
        var chromaWeight = 1 + 0.04500000000007276 * firstChroma,
          hueWeight = 1 + 0.01499999999987267 * firstChroma,
          normalizedLightness = deltaLightness / 1,
          normalizedChroma = deltaChroma / chromaWeight,
          normalizedHue = deltaHueSquared / hueWeight,
          distanceSquared =
            normalizedLightness * normalizedLightness +
            normalizedChroma * normalizedChroma +
            normalizedHue * normalizedHue;
        return distanceSquared < 0 ? 0 : Math.sqrt(distanceSquared);
      }
      /**
       * Convert RGB through the original normalized color-space calculation for perceptual palette matching. The exact floating-point constants are preserved even when historical versions differ by tiny arithmetic-obfuscation artifacts.
       *
       * Input bindings: rgb. Names describe inferred roles; protocol field names are preserved separately.
       */
      /* Convert RGB values to CIE Lab for perceptual palette matching. Keep the original floating-point constants for numerical correspondence. */
      function rgbToLab(rgb) {
        var linearRed = rgb[0] / 255,
          linearGreen = rgb[1] / 255,
          linearBlue = rgb[2] / 255,
          cieX,
          cieY,
          cieZ;
        return (
          (linearRed =
            linearRed > 0.040450000000419095
              ? Math.pow((linearRed + 0.05500000000029104) / 1.055000000000291, 2.400000000000091)
              : linearRed / 12.920000000000073),
          (linearGreen =
            linearGreen > 0.04044999999996435
              ? Math.pow((linearGreen + 0.05500000000029104) / 1.055000000000291, 2.3999999999999986)
              : linearGreen / 12.920000000000073),
          (linearBlue =
            linearBlue > 0.040450000000419095
              ? Math.pow((linearBlue + 0.055000000000063665) / 1.0549999999998363, 2.399999999999636)
              : linearBlue / 12.920000000000073),
          (cieX =
            (linearRed * 0.41239999999925203 +
              linearGreen * 0.35759999999936554 +
              linearBlue * 0.1805000000003929) /
            0.9504699999997683),
          (cieY =
            (linearRed * 0.21259999999983847 +
              linearGreen * 0.7151999999996406 +
              linearBlue * 0.07220000000006621) /
            1),
          (cieZ =
            (linearRed * 0.01929999999993015 +
              linearGreen * 0.11919999999918218 +
              linearBlue * 0.95049999999992) /
            1.0888299999996889),
          (cieX =
            cieX > 0.008856000000378117
              ? Math.pow(cieX, 0.3333333333333333)
              : 7.787000000000262 * cieX + 0.13793103448275862),
          (cieY =
            cieY > 0.008856000000378117
              ? Math.pow(cieY, 0.3333333333333333)
              : 7.787000000000262 * cieY + 0.13793103448275862),
          (cieZ =
            cieZ > 0.008856000000378117
              ? Math.pow(cieZ, 0.3333333333333333)
              : 7.787000000000262 * cieZ + 0.13793103448275862),
          [116 * cieY - 16, 500 * (cieX - cieY), 200 * (cieY - cieZ)]
        );
      }
      /**
       * Choose the best original similarity score from the current image-painter palette entries. Tie handling and score rounding are part of the original selection behavior.
       *
       * Input bindings: rgb. Names describe inferred roles; protocol field names are preserved separately.
       */
      /* Select the palette entry with the best original perceptual similarity score. */
      function findNearestPaletteColor(rgb) {
        var bestColorScore,
          colorEntry = false;
        for (var key in imagePainter.colors) {
          var colorDifferenceResult = 100 - colorDifference(rgb, imagePainter.colors[key].rgb);
          if (colorDifferenceResult < 0) {
            colorDifferenceResult = 0;
          }
          var number = Math.round(colorDifferenceResult * 10) / 10;
          if (!bestColorScore) {
            bestColorScore = number;
          } else bestColorScore = Math.max(bestColorScore, number);
          if (bestColorScore === number) {
            colorEntry = imagePainter.colors[key];
          }
        }
        return colorEntry;
      }
    }
    function randomInteger(minimum, maximum) {
      return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
    var unsupportedClientDetected = false,
      clientCheckGraceUntil = nowSeconds() + 120,
      nextClientCheckAt = nowSeconds() + randomInteger(30, 75);
    setInterval(
      /**
       * Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.
       *
       * Direct network calls: POST /api/post-logout.php.
       *
       * Outgoing socket event names: hb.
       *
       * Shared/receiver state written: unsupportedClientDetected, clientCheckGraceUntil.
       *
       * Observed DOM operations: html.
       */
      function () {
        if (nextClientCheckAt < nowSeconds() && !unsupportedClientDetected) {
          if (
            (WebSocket && WebSocket.toString() && WebSocket.toString().indexOf('Bababot') !== -1) ||
            window.BababotWS ||
            window.Bot ||
            window.Tasker ||
            $('#m_dither_run').length > 0 ||
            $('#m_original').length > 0 ||
            $('#m_run').length > 0 ||
            $('#m_select').length > 0 ||
            $('#m_filter').length > 0 ||
            $('#m_height').length > 0 ||
            $('.menuinside').length > 0
          ) {
            api.xhr.req(
              'POST',
              '/api/post-logout.php',
              {},
              true,
              /**
               * HTTP completion callback for /api/post-logout.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: unsupportedClientDetected.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                unsupportedClientDetected = true;
              }
            );
            $('body').html(
              '<p style="padding:20px">You are using an injected script that is not supported on Pixelplace anymore, please disable <b>Bababoy BOT</b> to continue playing on Pixelplace.<br><br>If you are a Premium user, you now have access to an official BOT. Press SHIFT+B on your keyboard to start using it.</p>'
            );
            unsupportedClientDetected = true;
          } else if (window.PPClient || window.PPAClient) {
            var requestData = {};
            requestData.log = 1;
            api.xhr.req(
              'POST',
              '/api/post-logout.php',
              requestData,
              true,
              /**
               * HTTP completion callback for /api/post-logout.php. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
               *
               * Shared/receiver state written: unsupportedClientDetected.
               *
               * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
               */
              function (success, response) {
                unsupportedClientDetected = true;
              }
            );
            $('body').html(
              '<p style="padding:20px">You are using an injected script that is not supported on Pixelplace anymore, please disable <b>PPClient BOT</b> to continue playing on Pixelplace.<br><br>If you are a Premium user, you now have access to an official BOT. Press SHIFT+B on your keyboard to start using it.</p>'
            );
          }
        }
        clientCheckGraceUntil <= nowSeconds() &&
          (connection.io.emit('hb', ' '), (clientCheckGraceUntil = nowSeconds() + randomInteger(73, 92)));
      },
      5000
    );
    /* Control the page-level loader; the painting loader is managed independently. */
    function setPageLoading(visible, message) {
      if (message === undefined) {
        elements.loader.find('.text').text('LOADING');
      } else {
        elements.loader.find('.text').html(message);
      }
      visible ? elements.loader.show() : elements.loader.hide();
    }
    /* Control the painting loader while snapshots or canvas resources are being prepared. */
    function setPaintingLoading(visible, message) {
      if (message === undefined) {
        elements.loaderCanvas.find('.text').html('LOADING<br/>PAINTING');
      } else {
        elements.loaderCanvas.find('.text').html(message);
      }
      visible ? elements.loaderCanvas.show() : elements.loaderCanvas.hide();
    }
    setPaintingLoading(true);
    setPageLoading(true);
    var legacyInterfacePreference = localStorage.getItem('v1-enabled');
    legacyInterfacePreference &&
      parseInt(legacyInterfacePreference) === 1 &&
      ($('head [data-id="v1mode"]').remove(),
      $('.sidebar-april').remove(),
      $('#palette-buttons').remove(),
      $('head').append('<link rel="stylesheet" href="/css/aprilv1.css?v2=2" data-id="v1mode">'),
      $('body').prepend(
        '<div class="sidebar-april"> <div class="april-connected"> <div class="margin-top"><span></span><a href="#" data-id="guild" class="open-guild" data-tag=""></a> <div class="bull">&bull;</div> <a href="#" data-id="username" class="open-profile" data-profile=""></a><a href="#" class="submit-button logout" data-id="logout" title="Logout"><img src="/img/icons/square-x.svg" height="24"></a></div> </div> <div class="april-guest"> <a href="#" class="btn-april open-modal" data-target="auth" data-content="login" data-extra="">Log In</a> <a href="#" class="btn-april open-modal" data-target="auth" data-content="register" data-extra="">Sign Up</a> </div> <h1>Color Palette</h1> <div id="palette-buttons" class="no-select"></div> <div> <a href="#" class="centered-label open-modal" title="Browse paintings" data-target="main" data-content="top">Canvas list</a> <a href="#" class="centered-label open-modal" title="Create painting" data-target="main" data-content="painting">Create a canvas</a> </div> <div class="april-social"> <a href="https://discord.gg/xcFJ6nY" target="_blank" class="discord-pp"><img src="/img/discord.svg" alt="icon" width="26"></a> <a href="https://reddit.com/r/PixelPlace/" target="_blank" class="reddit-pp"><img src="/img/reddit.svg" alt="icon" width="26"></a> </div> <h1 class="terms-april"><a href="#" title="Click to read Terms, Copyright & more" class="open-modal" data-target="main" data-content="terms">About / Terms</a></h1> </div>'
      ));
    if (!appState.started) {
      appState.started = true;
      var paintingId = 7,
        pathname = window.location.pathname;
      pathname = parseInt(pathname.substring(1));
      if (pathname === 0 && !isNaN(pathname)) paintingId = 13;
      else if (pathname != 0 && !isNaN(pathname)) {
        paintingId = parseInt(pathname);
      }
      var hasAuthCookie = 0;
      Cookies.get('authId') && (hasAuthCookie = 1);
      api.xhr.req(
        'GET',
        '/api/get-painting.php?id=' + paintingId + '&connected=' + hasAuthCookie,
        {},
        true,
        /**
         * HTTP completion callback for /api/get-painting.php?id=. It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.
         *
         * Shared/receiver state written: serverData.
         *
         * Observed DOM operations: html.
         *
         * Input bindings: success, response. Names describe inferred roles; protocol field names are preserved separately.
         */
        function (success, response) {
          if (success) {
            response.painting.palette.length <= 0 &&
              (response.painting.palette = appState.painting.palette.order);
            serverData = response;
            if (
              serverData.update_version !== undefined &&
              parseInt(serverData.update_version) > clientVersion
            )
              $('body').html(
                '<p style="padding:20px">PixelPlace has been updated.<br/><br/>Please refresh the page.<br/><br/>If you see this message again, restart your browser or/and <a href="https://www.google.com/search?q=how+to+empty+browser+cache&oq=how+to+empty+browser+cache" target="_blank">empty your browser cache</a>. <br/><br/>If you are having issues, please contact us at support@pixelplace.io<p/>'
              );
            else if (window.location.href.indexOf('?forgotKey=') !== -1) {
              initializePainting();
            } else if (
              !serverData.painting.slug ||
              serverData.painting.slug === '' ||
              window.location.pathname.indexOf(serverData.painting.slug) !== -1
            )
              initializePainting();
            else if (paintingId === 13) initializePainting();
            else {
              var text = '',
                position = {},
                hash = window.location.hash;
              if (hash != '') {
                var hash = hash.split('=');
                hash.length >= 4 &&
                  ((position.x = parseInt(hash[1])),
                  (position.y = parseInt(hash[2])),
                  (position.s = parseFloat(hash[3])),
                  !isNaN(position.x) &&
                    !isNaN(position.y) &&
                    !isNaN(position.s) &&
                    (text = '#x=' + position.x + '&y=' + position.y + '&s=' + position.s));
              }
              window.location.replace('/' + serverData.painting.id + '-' + serverData.painting.slug + text);
            }
          } else {
            alert(response.message);
            response.action !== undefined &&
              response.action === 'redirect' &&
              window.location.replace('/' + appState.page);
          }
        },
        true
      );
    }
    $(document).on(
      'click',
      '#checkout-stripe, #checkout-paypal',
      /**
       * Registered click callback delegated to "#checkout-stripe, #checkout-paypal". It reads the current shared state when the event arrives; registration does not execute the callback body.
       *
       * Direct network calls: POST /api/stripe.php.
       *
       * Observed DOM operations: attr.
       *
       * This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.
       *
       * Input bindings: event. Names describe inferred roles; protocol field names are preserved separately.
       */
      function (event) {
        event.preventDefault();
        if (
          confirm(
            'You agree to our Terms of Sale and the immediate delivery of the digital content. You acknowledge that you will lose your right of withdrawal as soon as you start using the content.'
          )
        ) {
          if ($(event.target).attr('id') === 'checkout-stripe' || $(this).attr('id') === 'checkout-stripe') {
            var stripe = Stripe(
                'pk_live_51HqfzIJB1jBDkpwocqNriWu2fhJahxNOhJ4rgTohxQxReXIgtkQYdWeZQdFqXcry1oXxAAPg1k1hB3bqwTa0nkWm00yrqtRSIH'
              ),
              requestData = {};
            requestData.priceId = selectedPriceId;
            requestData['create-checkout-session'] = true;
            api.xhr.req('POST', '/api/stripe.php', requestData, true, function (success, response) {
              if (success) {
                var checkoutOptions = {};
                checkoutOptions.sessionId = response.sessionId;
                stripe.redirectToCheckout(checkoutOptions);
              } else {
                showNotification('error', 'Error', response.message);
              }
            });
          } else $('#paypal').submit();
        }
      }
    );
  }
);
