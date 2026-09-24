## 🎯 WME Jump to Node

**On a long segment, one end is often off screen.** To look at a node — turns, junction, restriction — you scroll the map by hand, then scroll back. This script takes you there in one click, and brings you back.

### In the segment panel

One line under the panel header: `NODE (A)(B) | (⛶)(◎) | (↩)   545 m`

* **A · B** — centre the map on node A or node B of the selected segment. Zoom and selection are kept.
* **⛶ Fit** — zoom so the whole selection fits on screen.
* **◎ Middle** — centre on the middle, measured along the road.
* **↩ Back** — return to the view before the first move: A, then B, then Back brings you home.
* **Length** — the length of the selection (the total for several segments), the same figure as at the bottom of the panel, in your WME units (m/km or ft/mi). No more scrolling down to find it.

### On the map

Rest the pointer on a selected segment: the same buttons appear right next to it. A click, moving away, moving the map or **Esc** closes them. They never open while you draw or drag, and can be turned off in the Scripts tab.

### Several segments

If the selected segments follow one another, **A** and **B** take you to the two ends of the chain, and **◎** to its middle. If they do not, **Fit** and **Middle** (centre of the area) remain.

### Keyboard

Five shortcuts are listed **without keys** under Settings › Keyboard shortcuts, so as not to take any from another script. Assign the ones you want there.

### Good to know

* Never changes the map: nothing enters the undo stack.
* Languages: English, French, German, Spanish, Italian, Portuguese (BR/PT), Hebrew. Follows the WME locale.
* Built on the WME SDK: no external request, no dependency.
* Born from a request left unanswered on the Waze Scripts Discord (`#script-ideas-requests`). The script that used to do this (2022) relies on WME internals that no longer exist.

Source code, history and issues: [GitHub](https://github.com/DrSlump34/WME-Jump-to-Node)
