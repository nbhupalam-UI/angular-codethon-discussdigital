let bindClicktoTile = function() {
        var $tile = $('.c-job-tile');
        var is_mobile = false;
        var is_desktop = false;
        var is_tablet = false;
        var social_sharing_closebtn = $('.c-social-sharing__close-btn');
        var social_sharing = $('.c-social-sharing');
        var shareInfoIcon = $('.shareinfoicon');
        var social_icon_twitter = $('.c-social-icon--twitter');
        var linkedin_circle = $('.c-icon--linkedin-circle');
        var social_icon_fb = $('.c-social-icon--fb');
        if ($('#jobTileHidden').css('display') === 'none') {
            is_mobile = true;
        }
        if ($('#jobTileDesktop').css('display') === 'none') {
            is_desktop = true;
        }
        if ($('#jobTileTablet').css('display') === 'none') {
            is_tablet = true;
        }
        if (is_mobile === true && is_desktop === false && is_tablet === false) {
            $('[data-toggle="modal"]').off('touchstart').on('touchstart', function() {
                // get id of Modal Box
                var modalSelector = $(this).data('trigger');
                $('#' + modalSelector).ndbxModal().open();
            });
            // social icon
            social_sharing_closebtn.off('touchstart').on('touchstart', function(e) {
                $tile.removeClass('hover');
                $(e.target).closest('.c-tooltip--top').find('.c-tooltip__item').removeClass("is-open");
            });
            social_sharing.off('touchstart').on('touchstart', function() {
                $(this).next().toggleClass('active');
            });
            shareInfoIcon.off('touchstart').on('touchstart', function(e) {
                e.stopPropagation();
                $(e.target).parent().parent().removeClass('hover');
                $(e.target).closest('.c-product-job-tile').find('.c-job-tile-flyout').removeClass('active');
                $(e.target).closest('.c-product-job-tile').find('.c-social-sharing').addClass("is-open");
            });
            social_icon_twitter.off('touchstart').on('touchstart', function(event) {
                var tweetUrl = "http://www.twitter.com/intent/tweet?";
                var dataShareLink = $(event.target).parents('.c-product-job-tile');
                dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                var currentPageUrl = window.origin + dataShareLink;
                window.open(tweetUrl + 'text=' + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
            });
            social_icon_fb.off('touchstart').on('touchstart', function(event) {
                var fbUrl = "https://www.facebook.com/sharer/sharer.php?";
                var dataShareLink = $(event.target).parents('.c-product-job-tile');
                dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                var currentPageUrl = window.origin + dataShareLink;
                window.open(fbUrl + 'u=' + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
            });
            linkedin_circle.off('touchstart').on('touchstart', function(event) {
                var linkedinUrl = "http://www.linkedin.com/shareArticle?mini=true&url=";
                var dataShareLink = $(event.target).parents('.c-product-job-tile');
                dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                var currentPageUrl = window.origin + dataShareLink;
                window.open(linkedinUrl + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
            });
        } else if ((('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
            if((is_tablet === true) && is_desktop === false){
                $tile.on('touchstart', function() {
                    $tile.not(this).removeClass('hover');
                    $('.c-job-tile-flyout').removeClass('active');
                    $(this).addClass('hover');
                    $(this).next().addClass('active');
                });
                // social icon
                social_sharing_closebtn.off('touchstart').on('touchstart', function(e) {
                    $tile.removeClass('hover');
                    $(e.target).closest('.c-tooltip--top').find('.c-tooltip__item').removeClass("is-open");
                });
                social_sharing.off('touchstart').on('touchstart', function() {
                    $(this).next().toggleClass('active');
                });
                shareInfoIcon.off('touchstart').on('touchstart', function(e) {
                    e.stopPropagation();
                    $(e.target).parent().parent().removeClass('hover');
                    $(e.target).closest('.c-product-job-tile').find('.c-job-tile-flyout').removeClass('active');
                    $(e.target).closest('.c-product-job-tile').find('.c-social-sharing').addClass("is-open");
                });
                social_icon_twitter.off('touchstart').on('touchstart', function(event) {
                    var dataShareLink = $(event.target).parents('.c-product-job-tile');
                    dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                    var tweetUrl = "http://www.twitter.com/intent/tweet?";
                    var currentPageUrl = window.origin + dataShareLink;
                    window.open(tweetUrl + 'text=' + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
                });
                social_icon_fb.off('touchstart').on('touchstart', function(event) {
                    var dataShareLink = $(event.target).parents('.c-product-job-tile');
                    dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                    var fbUrl = "https://www.facebook.com/sharer/sharer.php?";
                    var currentPageUrl = window.origin + dataShareLink;
                    window.open(fbUrl + 'u=' + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
                });
                linkedin_circle.off('touchstart').on('touchstart', function(event) {
                    var dataShareLink = $(event.target).parents('.c-product-job-tile');
                    dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                    var linkedinUrl = "http://www.linkedin.com/shareArticle?mini=true&url=";
                    var currentPageUrl = window.origin + dataShareLink;
                    window.open(linkedinUrl + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
                });
            }
        } else if (is_desktop === true) {
            $tile.hover(function() {
                $(this).addClass('hover');
                $(this).next().addClass('active');
            }, function() {
                $(this).next().removeClass('active');
                $(this).removeClass('hover');
            });
            $tile.off('click').on('click', function() {
                var hrefattr = $(this).siblings('.c-job-link').attr('href');
                if ($(this).siblings('.c-job-link') && $(this).siblings('.c-job-link').length > 0 && hrefattr !== '') {
                    window.location.href = $(this).siblings('.c-job-link').attr('href');
                }
            });
            // social icon
            social_sharing_closebtn.off('click').on('click', function(e) {
                $tile.removeClass('hover');
                $(e.target).closest('.c-tooltip--top').find('.c-tooltip__item').removeClass("is-open");
            });
            social_sharing.off('click').on('click', function() {
                $(this).next().toggleClass('active');
            });
            shareInfoIcon.off('click').on('click', function(e) {
                e.stopPropagation();
                $(e.target).parent().parent().removeClass('hover');
                $(e.target).closest('.c-product-job-tile').find('.c-job-tile-flyout').removeClass('active');
                $(e.target).closest('.c-product-job-tile').find('.c-social-sharing').addClass("is-open");
            });
            social_icon_twitter.off('click').on('click', function(event) {
                var dataShareLink = $(event.target).parents('.c-product-job-tile');
                dataShareLink.find('.shareinfoicon').attr('data-share-link');
                var tweetUrl = "http://www.twitter.com/intent/tweet?";
                var currentPageUrl = window.origin + dataShareLink;
                window.open(tweetUrl + 'text=' + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
            });
            social_icon_fb.off('click').on('click', function(event) {
                var dataShareLink = $(event.target).parents('.c-product-job-tile');
                dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                var fbUrl = "https://www.facebook.com/sharer/sharer.php?";
                var currentPageUrl = window.origin + dataShareLink;
                window.open(fbUrl + 'u=' + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
            });
            linkedin_circle.off('click').on('click', function(event) {
                var dataShareLink = $(event.target).parents('.c-product-job-tile');
                dataShareLink = dataShareLink.find('.shareinfoicon').attr('data-share-link');
                var linkedinUrl = "http://www.linkedin.com/shareArticle?mini=true&url=";
                var currentPageUrl = window.origin + dataShareLink;
                window.open(linkedinUrl + currentPageUrl, "pop", "width=600, height=400, scrollbars=no");
            });
        }
        $('.close-icon').on('click', function() {
            $('.c-job-tile-flyout').removeClass('active');
            $tile.removeClass('hover');
            $(this).parent().parent().removeClass('active');
        });
    };
    window.convert = window.convert || function(content) {
        var combinators = [{
                expression: /~crlf~/g,
                placement: '<br/>'
            }, {
                expression: /~space~/g,
                placement: ' '
            }, {
                expression: /\[BULLET]/g,
                placement: '</li><li class="c-list__item">'
            }, {
                expression: /^#{1,2}\s*|([^\w#])#{1,2}\s*/g,
                placement: '$1</li><li class="c-list__item">'
            }, {
                expression: /\*\s/g,
                placement: '</li><li class="c-list__item">'
            }, {
                expression: /^\-\s*|([^\w\-])\-\s*/g,
                placement: '$1</li><li class="c-list__item">'
            }, {
                expression: /&bull;/g,
                placement: '</li><li class="c-list__item">'
            }, {
                expression: /&#8226;/g,
                placement: '</li><li class="c-list__item">'
            }, {
                expression: /�/g,
                placement: '</li><li class="c-list__item">'
            }, {
                expression: /•/g,
                placement: '</li><li class="c-list__item">'
            }],
            combinatorCheck = false;
        if (content === '' && content == null && content === undefined) {
            return content;
        }
        combinators.forEach(function(combinator) {
            if (combinator.expression && combinator.placement) {
                content = content.replace(combinator.expression, combinator.placement);
                combinatorCheck = true;
            }
        });
        if (combinatorCheck) {
            content = content.replace('</li>', '<ul class="c-list">');
            content += '</li></ul>';
        }
        return content;
    };
    let $url = $('.searchUrl-hidden');
    let $totalResultCount = $('.resultCount-hidden');
    let $loadMoreMessage = $('.loadMoreMessage-hidden');
    let $langId = $('.langId-hidden');
    let $countryId = $('.countryId-hidden');
    let $labelOne = $('.labelOne-hidden');
    let $labelTwo = $('.labelTwo-hidden');
    let $showJobs = $('#showjobs');
    let ajaxUrl;
    let counter = 1;
    let id = 0;
    let allowedLimit;
    let message;
    let country;
    let language;
    let jobResults = [];
    let orderBy = "desc";
    if (searchRequest === undefined) {
       let searchRequest = {};
    }
    if ($url.length > 0) {
        ajaxUrl = $url.val();
    }
    if ($totalResultCount.length > 0) {
        allowedLimit = $totalResultCount.val();
    }
    if ($loadMoreMessage.length > 0) {
        message = $loadMoreMessage.val();
    }
    if ($countryId.length > 0) {
        country = $countryId.val();
    }
    if ($langId.length > 0) {
        language = $langId.val();
    }
    if ($labelOne.length > 0) {
        let labelOne = $labelOne.val();
    }
    if ($labelTwo.length > 0) {
        let labelTwo = $labelTwo.val();
    }
    let $target = $(".c-job-product-tile-section .c-job-result-grid .l-grid__row");
    if ($('#searchtileDiv').attr('data-page') === "searchtile") {
        let moreDetails = document.getElementById('moreDetails').value;
        let validTill = document.getElementById('validTill').value;
    }
    let $popup = '<div id="tile{{count}}" class="c-popup js-popup" tabindex="-1" role="dialog">' +
        '   <div class="tile-popup c-popup__dialog">' +
        '      <div class="l-grid l-grid--max-width u-padding-top-md">' +
        '         <div>' +
        '            <span class="c-popup__close c-icon c-icon--close" data-dismiss="modal" aria-label="Close"></span>' +
        '            <p class="c-copy u-text-left u-margin-none">' + validTill + '</p>' +
        '            <h6 class="c-heading u-text-left c-job-title block-with-text">{{jobTitle}}</h6>' +
        '            <div class="l-grid">' +
        '               <div class="l-grid__row">' +
        '                  <div class="l-grid__column-6 u-text-center u-margin-bottom-lg">' +
        '<div class="c-icon--outline c-tile--product-teaser__icon c-job-tile-icon t-primary-action-dark '+
        ' c-icon c-icon--product-person"'+
        ' style="font-size: 32px;"></div>' +
        '                     <p class="c-copy u-text-center u-margin-none">{{hierarchyLevel}}</p>' +
        '                  </div>' +
        '                  <div class="l-grid__column-6 u-text-center u-margin-bottom-lg">' +
        '<div class="c-icon--outline c-tile--product-teaser__icon c-job-tile-icon t-primary-action-dark c-icon '+
        'c-icon--product-clock c-icon--job-product" style="font-size: 32px;"></div>' +
        '                     <p class="c-copy u-text-center u-margin-none">Full Time</p>' +
        '                  </div>' +
        '               </div>' +
        '            </div>' +
        '            <p class="c-copy c-job-desc u-text-left block-with-desc">{{description}}</p>' +
        '            <div class="description-wrapper"><a class="c-link c-link--block"'+
        'href="/content/onemarketing/global-people-attraction/one-career-website'+
        '/en_us/jobs/C2EBDE1DCF031ED88C9FE80C98BDC2A5.html">'+
        '</a></div>' +
        '         </div>' +
        '         <div class="l-grid__row justify-content-center u-padding-top-md">' +
        '            <div class="l-grid__column-small-12 l-grid__column-medium-12 l-grid__column-large-12">' +
        '               <a href=\'{{jobPageLink}}\' class="c-button u-full-width u-text-center u-margin-top-0" type="">' +
        '                 SEE FULL DESCRIPTION' +
        '               </a>' +
        '            </div>' +
        '         </div>' +
        '      </div>' +
        '   </div>' +
        '</div>';
    let $template = '<div class="l-grid__column-small-12 l-grid__column-medium-6 l-grid__column-large-4 c-product-job-tile">' +
        '      <a class="c-link c-link--block c-link--block-custom c-job-link" href=\'{{jobPageLink}}\'>' +
        '        <span aria-hidden="true" class="c-link__icon c-icon c-icon--arrow-right"></span>' +
        '        <span class="c-link__text">' + moreDetails + '</span>' +
        '      </a>' +
        '<div class="c-tooltip--top">' +
        '<div class="c-tooltip__item c-social-sharing js-social-sharing" role="tooltip" aria-hidden="true">' +
        '<span class="c-social-sharing__close-btn js-close c-icon c-icon--close c-icon--functional"></span>' +
        '<div class="c-social-sharing__body">' +
        '<p class="c-copy c-copy--no-margin c-copy--xlarge u-text-weight-light">Share this job' +
        '</p>' +
        '<div class="c-social-sharing__icon-container">' +
        '<span id="facebookShare" class="c-social-icon c-social-icon--fb c-icon c-icon--facebook-circle"></span>' +
        '<span id="linkedInShare" class="c-social-icon c-icon t-primary-action-dark c-icon--linkedin-circle"></span>' +
        '<span id="twitterShare" class="c-social-icon c-social-icon--twitter c-icon c-icon--twitter-circle"></span>' +
        '</div>' +
        '<div class="c-social-sharing__sharing-info">' +
        '<a class="c-link c-link--block c-link--no-text-transform c-social-sharing__toggle-info js-show-info u-margin-0"href="#">'+
        '<span aria-hidden="true" class="c-link__icon fa fa-long-arrow-down"></span>' +
        '<span class="c-link__text">View Sharing Information</span>' +
        '</a>' +
        '<a class="c-link c-link--block c-link--no-text-transform c-social-sharing__toggle-info js-hide-info u-margin-0"href="#">'+
        '<span aria-hidden="true" class="c-link__icon fa fa-long-arrow-up"></span>' +
        '<span class="c-link__text">Hide Sharing Information</span>' +
        '</a>' +
        '<div class="c-social-sharing__sharing-info__content js-info-content">' +
        '<p class="c-copy c-copy--no-margin">Personal data info. Lorem ipsum dolor sit amet, consectetur adipisicing elit' +
        '</p>' +
        '<div class="c-social-sharing__sharing-info__content__button">' +
        '<button class="c-button c-button--small c-button--secondary u-margin-right-sm js-cancel-btn" type="">Cancel' +
        '</button>' +
        '<button class="c-button c-button--small js-accept-btn" type=""> Accept' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '  <div class="c-job-tile c-tile--product " data-toggle="modal" data-trigger="tile{{count}}">' +
        '    <div class="c-job-tile-head">' +
        '      <div class="c-app-date">' +
        '        <p class="c-copy u-text-left">' +
        validTill +
        '        </p>' +
        '        <p class="c-copy u-text-left" >' +
        '          {{applicationEndDate}}' +
        '        </p>' +
        '      </div>' +
        '      <div class="c-icon c-icon--share c-icon--s share-icon shareinfoicon" data-share-link=\'{{jobPageLink}}\'>' +
        '</div>' +
        '    </div>' +
        '    <h5 class="c-heading u-text-left c-job-title block-with-text add-ellipsis lines">' +
        '      {{jobTitle}}' +
        '    </h5>' +
        '    <div class="c-job-tile-desc">' +
        '      <p class="c-copy c-job-company u-text-weight-bold u-text-left block-with-text" >' +
        '        {{company}}' +
        '      </p>' +
        '      <p class="c-copy c-job-location-country u-text-left u-margin-none" >' +
        '        {{city}} <span>&nbsp;</span> ' +
        '      </p>' +
        '      <p class="c-copy c-job-location u-text-left u-margin-none" >' +
        '        {{state}}, {{country}}' +
        '      </p>' +
        '    </div>' +
        '  </div>' +
        '  <div class="c-job-tile-flyout">' +
        '    <div class="c-job-tile-popup">' +
        '      ' +
        '      <span class="popup-arrow"></span>' +
        '      <div class="c-icon c-icon--close close-icon"></div>' +
        '      <p class="c-copy u-text-left u-margin-none" >' +
        validTill + ' ' + '{{applicationEndDate}}' +
        '      </p>' +
        '      <h6 class="c-heading u-text-left c-job-title block-with-text">' +
        '        {{jobTitle}}' +
        '      </h6>' +
        '' +
        '      <div class="l-grid">' +
        '        <div class="l-grid__row">' +
        '          <div class="l-grid__column-6 u-text-center u-margin-bottom-lg">' +
        '<div class="c-icon--outline c-tile--product-teaser__icon c-job-tile-icon t-primary-action-dark' +
        ' c-icon c-icon--product-person" style="font-size: 32px;"></div>' +
        '            <p class="c-copy u-text-center u-margin-none" >' +
        '              {{hierarchyLevel}}' +
        '            </p>' +
        '          </div>' +
        '          <div class="l-grid__column-6 u-text-center u-margin-bottom-lg">' +
        '<div class="c-icon--outline c-tile--product-teaser__icon c-job-tile-icon t-primary-action-dark'+
        ' c-icon c-icon--product-clock c-icon--job-product"'+
        ' style="font-size: 32px;"></div>' +
        '            <p class="c-copy u-text-center u-margin-none" >' +
        '              {{contractType}}' +
        '            </p>' +
        '          </div>' +
        '        </div>' +
        '      </div>' +
        '      <p class="c-copy c-job-desc u-text-left block-with-desc">' +
        '        {{description}}' +
        '      </p>' +
        '      <div class="description-wrapper">' +
        '        <a class="c-link c-link--block"' +
        '           href=\'{{jobPageLink}}\'>' +
        '        </a>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        ' ' + $popup + ' ' +
        '</div>';
    let request = {
        "searchLimit": "9",
        "resultSet": "0",
        "orderBy": "desc"
    };
    if (country) {
        request.countryID = country;
    }
    if (language) {
        request.language = language;
    }
    if (orderBy) {
        request.orderBy = orderBy;
    }
    let changeContent = function() {
        $('.c-job-desc').each(function() {
            if ($(this).data('converted') === undefined) {
                $(this).html(convert($(this).html()));
                $(this).data('converted', true);
            }
        });
    };
    let removeComma = function(className) {
        var $item = $('.c-product-job-tile:last-of-type ' + className);
        if ($item.length > 0) {
            $item.html($item.html().trim().replace(/^,/g, ""));
            $item.html($item.html().trim().replace(/,$/g, "<span>&nbsp;</span>"));
        }
    };
    let loadMore = function(ajaxUrlparam, jobResultsparam, totalResultCount) {
      var $loadMore = $(".c-job-load-more");
      if (jobResultsparam.length === totalResultCount) {
        $loadMore.removeClass("active");
      }
      if (jobResultsparam.length >= allowedLimit) {
        $loadMore.find(".c-link__text").html(message);
      }
      $loadMore.off("click.load").on("click.load", function(event) {
        event.preventDefault();
        $loadMore.find(".c-link__text").html("Loading");
        fetchJobResultAndReload(ajaxUrlparam, request, jobResultsparam, {
          resultSet: "load"
        });
      });
    };
    let processResultSet =function (resultSet,jobResultsparam) {
        for (let i = 0; i < resultSet.searchResults.length && resultSet.searchResults[i] !== undefined && i < 9; i++) {
          let tile = resultSet.searchResults[i];
          jobResultsparam.push(tile);
          tile.count = jobResultsparam.length;
          $target.append(Mustache.to_html($template, tile));
          var loadMoreLabel = document.getElementById("loadMoreLabel").value;
          $loadMore.find(".c-link__text").html(loadMoreLabel);
          tile.visible = true;
          changeContent();
          removeComma(".c-job-location-country");
          removeComma(".c-job-location");
        }
        if (resultSet.totalResultCount !== undefined && jobResultsparam.length < resultSet.totalResultCount - 1) {
          $loadMore.addClass("active");
        }
    }
    let fetchJobResultAndReload = function(ajaxUrlparam, requestparam, jobResultsparam, query) {
      var $resultsWrapper = $("#resultsWrapper");
      var $jobResult = $(".c-job-result");
      var $loadMore = $(".c-job-load-more");
      if (query && query.filters !== undefined) {
        requestparam.orderBy = query.filters;
        orderBy = requestparam.orderBy;
      }
      $.post(ajaxUrlparam, requestparam, function(resultSet) {
          if (resultSet !== undefined) {
            requestparam.resultSet = parseInt(resultSet.currentStartIndex) + 9;
            if (resultSet.totalResultCount !== undefined && resultSet.searchResults !== undefined) {
              var totalSearchResultCount = resultSet.totalResultCount;
              if (totalSearchResultCount < 1) {
                $loadMore.removeClass("active");
                $jobResult.removeClass("active");
                $loadMore.addClass("u-hidden");
                $jobResult.addClass("u-hidden");
              }
              if ($resultsWrapper.length > 0 && totalSearchResultCount >= 0) {
                $resultsWrapper
                  .find("#resultCount")
                  .html(totalSearchResultCount);
                $jobResult.addClass("active");
              }
              if ($resultsWrapper.length > 0 && totalSearchResultCount < 1) {
                $resultsWrapper.addClass("active");
                $jobResult.removeClass("active");
                $jobResult.addClass("u-hidden");
                $resultsWrapper
                  .find("#resultCount")
                  .html(totalSearchResultCount);
              }
              if (resultSet.searchResults.length > 0 && jobResultsparam.length <= resultSet.totalResultCount) {
                processResultSet(resultSet, jobResultsparam);
                bindClicktoTile();
                loadMore(ajaxUrlparam, jobResultsparam, resultSet.totalResultCount);
              }
            }
          }
        }, "json");
    };
    

    
    
    let bindFilters = function(ajaxUrlparam) {
        var $filterControl = $('.c-job-filter');
        var initValue;
        $filterControl.on('click', function() {
            if (($(this).hasClass('c-select2--is-filled')) && initValue !== $filterControl[0].dataset['value']) {
                initValue = $filterControl[0].dataset['value'];
                if (initValue != null || initValue !== undefined || initValue !== '' && ajaxUrlparam !== undefined) {
                    jobResults = [];
                    $target.html('');
                    if (initValue === $($('#sortByNewestOrOldest').find('.c-select2-results__option-label')[0]).text()) {
                        request.resultSet = 0;
                        fetchJobResultAndReload(ajaxUrlparam, request, jobResults, {
                            'filters': 'desc'
                        });
                    } else if (initValue === $($('#sortByNewestOrOldest').find('.c-select2-results__option-label')[1]).text()) {
                        request.resultSet = 0;
                        fetchJobResultAndReload(ajaxUrlparam, request, jobResults, {
                            'filters': 'asc'
                        });
                    }
                }
            }
        });
    };
    let mergeSearchRequest = function(searchRequestparam) {
        request = Object.assign(request, searchRequestparam);
    };
    fetchJobResultAndReload(ajaxUrl, request, jobResults);
    bindFilters(ajaxUrl);
    if ($showJobs.length > 0) {
        $showJobs.click(function() {
            request.resultSet = 0;
            mergeSearchRequest(searchRequest);
            jobResults = [];
            $target.html('');
            fetchJobResultAndReload(ajaxUrl, request, jobResults);
        });
    }
    let convertContent = function(content) {
        var combinators = [{
            expression: /~crlf~/g,
            placement: '<br/>'
        }];
        if (content === '' && content == null && content === undefined) {
            return content;
        }
        combinators.forEach(function(combinator) {
            if (combinator.expression && combinator.placement) {
                content = content.replace(combinator.expression, combinator.placement);
            }
        });
        return content;
    };