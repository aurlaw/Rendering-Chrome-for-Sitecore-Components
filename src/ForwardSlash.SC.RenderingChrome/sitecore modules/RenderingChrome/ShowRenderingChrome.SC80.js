﻿define(["sitecore"], function (Sitecore) {
  Sitecore.Commands.ShowRenderingChrome =
  {
    commandContext: null,
    isEnabled: true,

    canExecute: function (context) {
      if (!Sitecore.ExperienceEditor.isInMode("edit")
        || !context
        || !context.button) {
        return false;
      }

      Sitecore.ExperienceEditor.Common.registerDocumentStyles(["/sitecore modules/RenderingChrome/chrome-styles.css"], window.parent.document);
      toggleRenderingChromeHighlight(context.button.get("isChecked") == "1");
      if (!Sitecore.Commands.ShowRenderingChrome.commandContext) {
        this.commandContext = Sitecore.ExperienceEditor.instance.clone(context);
      }

      return true;
    },

    execute: function (context) {
      Sitecore.ExperienceEditor.PipelinesUtil.generateRequestProcessor("ExperienceEditor.ToggleRegistryKey.Toggle", function (response) {
        response.context.button.set("isChecked", response.responseValue.value ? "1" : "0");
        toggleRenderingChromeHighlight(response.context.button.get("isChecked") == "1");
      }, { value: context.button.get("registryKey") }).execute(context);
    }
  };
  
  var toggleRenderingChromeHighlight = function(enabled) {
      var className = "chromeRenderingHighlight";
	  if (enabled) {
		window.top.document.documentElement.classList.add(className);
	  } else {
		window.top.document.documentElement.classList.remove(className);  
	  }
  };
});