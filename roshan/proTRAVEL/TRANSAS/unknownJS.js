function ConfigreToolbarDisplay() {
            HideAssociatedViewButtons('new_new_cashflow_new_cashflowitem', ['Add existing Budget Line to this record']);
        }

        function HideAssociatedViewButtons(loadAreaId, buttonTitles) {
            var navElement = document.getElementById('nav_' + loadAreaId);
            if (navElement != null) {
                navElement.onclick = function LoadAreaOverride() {
                    // Call the original CRM method to launch the navigation link and create area iFrame
                    loadArea(loadAreaId);
                    HideViewButtons(document.getElementById(loadAreaId + 'Frame'), buttonTitles);
                }
            }
        } 

         function HideViewButtons(Iframe, buttonTitles) {
            if (Iframe != null) {
                Iframe.onreadystatechange = function HideTitledButtons() {
                    if (Iframe.readyState == 'complete') {
                        var iFrame = frames[window.event.srcElement.id];
                        var liElements = iFrame.document.getElementsByTagName('li');

                        for (var j = 0; j < buttonTitles.length; j++) {
                            for (var i = 0; i < liElements.length; i++) {
                                if (liElements[i].getAttribute('title') == buttonTitles[j]) {
                                    liElements[i].style.display = 'none';
                                    break;
                                }
                            }
                        }
                    } 