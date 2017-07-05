var admobid = {};
if (/(android)/i.test(navigator.userAgent)){
    console.log('Android');
    admobid = { // for Android
        banner: 'ca-app-pub-4068788481726502/7482422877',
        interstitial: 'ca-app-pub-6869992474017983/1657046752'
    };
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)){
    admobid = { // for iOS
        banner: 'ca-app-pub-4068788481726502/7482422877',
        interstitial: 'ca-app-pub-6869992474017983/7563979554'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-4068788481726502/7482422877',
        interstitial: 'ca-app-pub-6869992474017983/1355127956'
    };
}

function initialization(){
    AdMob.getAdSettings(function(info){
        console.log('adId: ' + info.adId + '\n' + 'adTrackingEnabled: ' + info.adTrackingEnabled);
    }, function(){
        console.log('failed to get user ad settings');
    });

    AdMob.setOptions({
        //adId: admobid.banner,
        //adSize: 'SMART_BANNER',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        isTesting: true, // set to true, to receiving test ad for testing purpose
        bgColor: 'black', // color name, or '#RRGGBB'
        // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
    });

    // new events, with variable to differentiate: adNetwork, adType, adEvent
    $(document).on('onAdFailLoad', function(e){
        // when jquery used, it will hijack the event, so we have to get data from original event
        if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
        var data = e.detail || e.data || e;

        alert('error: ' + data.error +
            ', reason: ' + data.reason +
            ', adNetwork:' + data.adNetwork +
            ', adType:' + data.adType +
            ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.
        });

    $('#btn_size').click(showBannerSize);
    $('#btn_pos').click(showBannerPos);
    $('#btn_create').click(createSelectedBanner);
    $('#btn_show').click(showBannerAtPosition);

    $('#btn_remove').click(function(){
        AdMob.removeBanner();
    });

    $('#btn_hide').click(function(){
        AdMob.hideBanner();
    });

    // test interstitial ad
    $('#btn_prepare').click(function(){
        AdMob.prepareInterstitial({
            adId:admobid.interstitial,
            autoShow: $('#autoshow').prop('checked')
        });
    });

    $('#btn_showfull').click(function(){
        AdMob.showInterstitial();
    });
}


function createSelectedBanner(){
    AdMob.removeBanner();
    var ads_size = $("#btn_size_txt").text();
    var ads_pos = selected_pos_value;
    if(AdMob) AdMob.createBanner({
        adId: admobid.banner,
        overlap: $('#overlap').prop('checked'),
        offsetTopBar: $('#offsetTopBar').prop('checked'),
        adSize: ads_size,
        position: ads_pos
    });
}

function showBannerAtPosition(){
    var ads_pos = selected_pos_value;
    if(AdMob) AdMob.showBanner( ads_pos );
}

function showBannerSize() {
    var dlg = "banner_size.html";
    if (!dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            dialogs[dlg] = dialog;
            dialog.show();

            $('input[name=radio_size]').on('change', function() {
                var selected_value = $('input[name=radio_size]:checked').val();
                $("#btn_size_txt").text(selected_value);
                dialog.hide();
            });
        });
    } else {
        dialogs[dlg].show();
    }
}
function showBannerPos() {
    var dlg = "banner_pos.html";
    if (!dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            dialogs[dlg] = dialog;
            dialog.show();

            $('input[name=radio_pos]').on('change', function() {
                var selected_value = $('input[name=radio_pos]:checked').val();
                var selected_text = btnPosLabel(selected_value);
                $("#btn_pos_txt").text(selected_text);
                selected_pos_value = selected_value;
                dialog.hide();
            });
        });
    } else {
        dialogs[dlg].show();
    }
}

ca-app-pub-4068788481726502/7482422877