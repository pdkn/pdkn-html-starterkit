/** @jsxImportSource preact */
import classNames from 'classnames';
import type { ComponentChildren, ComponentChild } from 'preact';
import { useRef } from 'preact/hooks';
import { useTabState } from './useTabState';

const baseClasses = 'tab'

const variantsLookup = {
    bordered: 'tab-bordered',
    lifted: 'tab-lifted',
    boxed: 'tab-boxed',
}

const sizesLookup = {
  xsmall: 'tab-xs',
  small: 'tab-sm',
  medium: 'tab-md',
  large: 'tab-lg',
}

type ComponentVariant = keyof typeof variantsLookup
type ComponentSize = keyof typeof sizesLookup

// TODO abstract this out to a utility function so different tabs can have different styles
const activeTabBgColor = `[--tab-bg:hsl(var(--b2))]`;
const activePanelBgColor = 'bg-base-200';

const tabSlotKey = 'tab.' as const;
const panelSlotKey = 'panel.' as const;

type TabSlot = `${typeof tabSlotKey}${string}`;
type PanelSlot = `${typeof panelSlotKey}${string}`;

function isTabSlotEntry(
  entry: [string, ComponentChild]
): entry is [TabSlot, ComponentChild] {
  const [key] = entry;
  return key.startsWith(tabSlotKey);
}

function isPanelSlotEntry(
  entry: [string, ComponentChild]
): entry is [PanelSlot, ComponentChild] {
  const [key] = entry;
  return key.startsWith(panelSlotKey);
}

function getBaseKeyFromTab(slot: TabSlot) {
  return slot.replace(new RegExp(`^${tabSlotKey}`), '').replace('.active', '');
}

function getBaseKeyFromPanel(slot: PanelSlot) {
  return slot.replace(new RegExp(`^${panelSlotKey}`), '');
}

type Props = {
  variant?: ComponentVariant
  size?: ComponentSize
  [key: TabSlot | PanelSlot]: ComponentChild;
  sharedStore?: string;
};

export const Tabs = ({ sharedStore, variant, size, ...slots }: Props) => {
  const tabs = Object.entries(slots).filter(isTabSlotEntry);
  const panels = Object.entries(slots).filter(isPanelSlotEntry);

  /** Used to focus next and previous tab on arrow key press */
  const tabButtonRefs = useRef<Record<TabSlot, HTMLButtonElement | null>>({});

  const activeTab = tabs.find(([key]) => key.includes('.active')) ?? tabs[0];
  const firstTabKey = getBaseKeyFromTab(activeTab[0]);
  const [curr, setCurrStore] = useTabState(firstTabKey, sharedStore);

  function moveFocus(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      const currIdx = tabs.findIndex(
        ([key]) => getBaseKeyFromTab(key) === curr
      );
      if (currIdx > 0) {
        const [prevTabKey] = tabs[currIdx - 1];
        setCurrStore(getBaseKeyFromTab(prevTabKey));
        tabButtonRefs.current[prevTabKey]?.focus();
      }
    }
    if (event.key === 'ArrowRight') {
      const currIdx = tabs.findIndex(
        ([key]) => getBaseKeyFromTab(key) === curr
      );
      if (currIdx < tabs.length - 1) {
        const [nextTabKey] = tabs[currIdx + 1];
        setCurrStore(getBaseKeyFromTab(nextTabKey));
        tabButtonRefs.current[nextTabKey]?.focus();
      }
    }
  }

  return (
    <div>
      <div role="tablist" onKeyDown={moveFocus} className="tabs z-10 -mb-px">
        {tabs.map(([key, content], index) => (

          <button
            id={key}
            key={key}
            ref={(el) => (tabButtonRefs.current[key] = el)}
            onClick={() => {
              setCurrStore(getBaseKeyFromTab(key));
            }}
            type="button"
            aria-controls={`${key}-tabpanel-${index}`}
            aria-selected={curr === getBaseKeyFromTab(key)}
            className={classNames(
                {[baseClasses]: true},
                {[variantsLookup[variant]]: variant},
                {[sizesLookup[size]]: size},
                {'tab-active': curr === getBaseKeyFromTab(key)},
                {[activeTabBgColor]: curr === getBaseKeyFromTab(key)},
                {'[--tab-border-color:transparent]': curr !== getBaseKeyFromTab(key)},
            )}
            role="tab"
          >
            {/* {tab.icon && <tab.icon className={theme.tablist.tabitem.icon} />} */}
            {content}
          </button>
        ))}
        <div class="tab tab-lifted mr-6 flex-1 cursor-default [--tab-border-color:transparent]"></div>
      </div>
      {panels.map(([key, content], index) => (
        <div
          className={classNames(
            'p-4 rounded-b-lg rounded-t-lg border-solid border border-base-300',
            activePanelBgColor,
            {'rounded-tl-none': firstTabKey === getBaseKeyFromPanel(key)}
          )}
          hidden={curr !== getBaseKeyFromPanel(key)}
          role="tabpanel"
          aria-labelledby={`${tabSlotKey}${getBaseKeyFromPanel(key)}`}
          key={key}
        >
          {content}
        </div>
      ))}
    </div>
  );
}