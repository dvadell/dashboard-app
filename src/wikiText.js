function externalLinks(wikiText) {
  const externalLinksRE = /\[ *(.*?)( +.*?)?\ *\]/g;
  let lines = "";
  if (!wikiText) return;

  wikiText.split("\n").forEach(thisLine => {
    let matches = [];
    while ((matches = externalLinksRE.exec(thisLine))) {
      let isURLRE = /^http[s]?:\/\//;

      if (!isURLRE.test(matches[1])) {
        continue;
      }

      /* There are two posible cases:
      [http://lwn.net] and [http://lwn.net This is LWN] */
      let link = matches[1];
      let linkName =
        typeof matches[2] === "string" ? matches[2].replace(/^ +/, "") : link;

      thisLine = thisLine.replace(
        matches[0],
        '<a class="external" href="' + link + '">' + linkName + "</a>"
      );
    }
    lines = lines + "\n" + thisLine;
  });
  return lines;
}

function localLinks(wikiText) {
  const localLinksRE = /\[\[ *(.*?)(\|.*?)?\ *\]\]/g;
  let lines = "";
  if (!wikiText) return;

  wikiText.split("\n").forEach(thisLine => {
    let matches = [];
    while ((matches = localLinksRE.exec(thisLine))) {
      /* There are two posible cases:
      [[Main Page]] and [[Main Page|Welcome to the home page]] */
      let link = matches[1];
      let linkName =
        typeof matches[2] === "string" ? matches[2].replace(/^\|/, "") : link;

      thisLine = thisLine.replace(
        matches[0],
        '<a class="internal" href="' + link + '">' + linkName + "</a>"
      );
    }
    lines = lines + "\n" + thisLine;
  });
  return lines;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
const taskReplace = taskStatus => (dummy, task) => {
  let iconClass = "fa-square";
  if (taskStatus === "done") {
    iconClass = "fa-check-square";
  }
  if (taskStatus === "waiting") {
    iconClass = "fa-spinner";
  }

  return `<br><span class="fa ` + iconClass + `"></span> ` + task;
};

function lineByLine(wikiText) {
  const header1RE = /== *(.*) *==/;
  const header2RE = /=== *(.*) *===/;
  const header3RE = /==== *(.*) *====/;
  const header4RE = /===== *(.*) *=====/;
  const strikenRE = /~~ *(.*?) *~~/g;
  const pendingTaskRE = /^\[ \] (.*)/;
  const checkedTaskRE = /^\[x\] (.*)/;
  const waitingTaskRE = /^\[w\] (.*)/;
  if (!wikiText) return;

  let lines = "";
  wikiText.split("\n").forEach(element => {
    lines =
      lines +
      "\n" +
      element
        .replace(header4RE, "<h5>$1</h5>")
        .replace(header3RE, "<h4>$1</h4>")
        .replace(header2RE, "<h3>$1</h3>")
        .replace(header1RE, "<h2>$1</h2>")
        .replace(waitingTaskRE, taskReplace("waiting"))
        .replace(pendingTaskRE, taskReplace("pending"))
        .replace(checkedTaskRE, taskReplace("done"))
        .replace(strikenRE, "<strike>$1</strike>");
  });
  return lines;
}

function bullets(wikiText) {
  const bulletsRE = /^(\*+) (.*)/; /* matches "* ", "** ", "*** ", etc */
  let lines = "";
  let lastLevel = 0;
  if (!wikiText) return;

  wikiText.split("\n").forEach(element => {
    let matches = bulletsRE.exec(element);
    let thisLine = "";

    /* matches is null if it didn't match, or [something, 1st match, 2nd match] if it did */
    if (matches) {
      let level = matches[1].length; /* number of * */

      if (lastLevel < level) {
        /* We got into a deeper bullet level */
        thisLine = '<ul class="level' + level + '">\n';
      }
      if (lastLevel > level) {
        /* Shallower level */
        thisLine = "</ul>\n";
      }
      lastLevel = level;
      thisLine = thisLine + "<li>" + matches[2] + "</li>";
    } else {
      /* Doesn't start with "* " */
      if (lastLevel > 0) {
        /* it should close it */
        while (lastLevel--) {
          thisLine = thisLine + "\n</ul>";
        }
      }
      thisLine = thisLine + "\n" + element;
      lastLevel = 0;
    }
    lines = lines + "\n" + thisLine;
  });
  return lines;
}

function quote(wikiText) {
  const quotesRE = /^ (.*)/; /* matches " XXXXXX" */
  let lines = "";
  let blockquoteLast = 0;
  if (!wikiText) return;

  wikiText.split("\n").forEach(element => {
    let matches = quotesRE.exec(element);
    let thisLine = "";

    /* matches is null if it didn't match, or [something, 1st match] if it did */
    if (matches) {
      /* We are in a blockquote */
      if (blockquoteLast === 0) {
        /* And it's a new blockquote */
        thisLine = "<blockquote>\n";
      }
      blockquoteLast = 1;
      thisLine = thisLine + matches[1];
    } else {
      /* We are not in a blockquote */
      if (blockquoteLast === 1) {
        /* so we should close it */

        thisLine = "</blockquote>\n";
      }
      thisLine = thisLine + element;
      blockquoteLast = 0;
    }
    lines = lines + "\n" + thisLine;
  });
  return lines;
}

function wholeBody(wikiText) {
  let pRE = /\n *\n/g;
  let boldRE = /\'\'\'(.*?)\'\'\'/g;
  let italicsRE = /\'\'(.*?)\'\'/g;
  if (!wikiText) return;
  return wikiText
    .replace(pRE, "<p>\n")
    .replace(boldRE, "<strong>$1</strong>")
    .replace(italicsRE, '<span class="italics">$1</span>');
}

export function wtToHtml(wikiText) {
  const html = bullets(
    lineByLine(externalLinks(localLinks(wholeBody(quote(wikiText)))))
  );
  return html;
}
