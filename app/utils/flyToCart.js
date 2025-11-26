import { leftCartRef } from "../liquidostores/components/LeftSide";
import { topCartRef } from "../liquidostores/components/TopSide";

export function flyToCartAnimation(imageElement, leftCartRef, topCartRef) {
  if (!imageElement) return;

  // Clone the image
  const flyingImg = imageElement.cloneNode(true);
  const rect = imageElement.getBoundingClientRect();

  flyingImg.style.position = "fixed";
  flyingImg.style.top = rect.top + "px";
  flyingImg.style.left = rect.left + "px";
  flyingImg.style.width = rect.width + "px";
  flyingImg.style.height = rect.height + "px";
  flyingImg.style.zIndex = 9999;
  flyingImg.style.pointerEvents = "none";
  flyingImg.style.borderRadius = "8px";
  flyingImg.style.transition = "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)";

  document.body.appendChild(flyingImg);

  // Determine active cart target
  const isMobile = window.innerWidth < 768;
  const target = isMobile ? topCartRef.current : leftCartRef.current;

  if (!target) return;

  const targetRect = target.getBoundingClientRect();

  setTimeout(() => {
    flyingImg.style.top = targetRect.top + "px";
    flyingImg.style.left = targetRect.left + "px";
    flyingImg.style.width = "20px";
    flyingImg.style.height = "20px";
    flyingImg.style.opacity = "0.7";
  }, 50);

  setTimeout(() => flyingImg.remove(), 1250);
}
