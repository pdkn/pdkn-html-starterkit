import classNames from 'classnames';
import type { ComponentProps, FC, KeyboardEvent, PropsWithChildren, ReactElement } from 'react';
import { Children, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { TabProps } from './TabItem';
import { TabItem } from './TabItem';

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

export interface TabsProps extends PropsWithChildren<Omit<ComponentProps<'div'>, 'className' | 'style'>> {
    variant?: ComponentVariant
    size?: ComponentSize
    class?: string | ''
    className?: `Hey, sorry but you can't pass classes to the Button component - Design System decision 🤷‍♀️`
}

interface TabEventProps {
    target: number;
}

interface TabKeyboardEventProps extends TabEventProps {
    event: KeyboardEvent<HTMLButtonElement>;
}

  
export const TabsComponent:FC<TabsProps> = (props) => {
    const { variant, size, children, ...rest } = props

    const id = useId();
    const tabs = useMemo(
        () => Children.map(children as ReactElement<PropsWithChildren<TabProps>>[], ({ props }) => props),
        [children],
    );

    //console.log("tabs", tabs)
    const tabRefs = useRef<HTMLButtonElement[]>([]);
    const [activeTab, setActiveTab] = useState(
        Math.max(
        0,
        tabs.findIndex((tab) => tab.active),
        ),
    );
    const [focusedTab, setFocusedTab] = useState(
        Math.max(
        0,
        tabs.findIndex((tab) => tab.active),
        ),
    );

    const handleClick = ({ target }: TabEventProps): void => {
        setActiveTab(target);
        setFocusedTab(target);
      };
    
    const handleKeyboard = ({ event, target }: TabKeyboardEventProps): void => {
    if (event.key === 'ArrowLeft') {
        setFocusedTab(Math.max(0, focusedTab - 1));
    }

    if (event.key === 'ArrowRight') {
        setFocusedTab(Math.min(tabs.length - 1, focusedTab + 1));
    }

    if (event.key === 'Enter') {
        setActiveTab(target);
        setFocusedTab(target);
    }
    };

    useEffect(() => {
    tabRefs.current[focusedTab]?.focus();
    }, [focusedTab]);


  return (
    <div >
      <div
        aria-label="Tabs"
        role="tablist"
        className="tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            aria-controls={`${id}-tabpanel-${index}`}
            aria-selected={index === activeTab}
            className={classNames(
                {[baseClasses]: true},
                {[variantsLookup[variant]]: variant},
                {[sizesLookup[size]]: size},
                {
                'tab-active': index === activeTab,
            })}
            disabled={tab.disabled}
            id={`${id}-tab-${index}`}
            onClick={() => handleClick({ target: index })}
            onKeyDown={(event) => handleKeyboard({ event, target: index })}
            ref={(element) => (tabRefs.current[index] = element as HTMLButtonElement)}
            role="tab"
            tabIndex={index === focusedTab ? 0 : -1}
          >
            {/* {tab.icon && <tab.icon className={theme.tablist.tabitem.icon} />} */}
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            aria-labelledby={`${id}-tab-${index}`}
            className='p-4 bg-gray-50 rounded-lg dark:bg-gray-800'
            hidden={index !== activeTab}
            id={`${id}-tabpanel-${index}`}
            role="tabpanel"
            tabIndex={0}
          >
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  );
};

TabsComponent.displayName = 'Tabs.Group';
TabItem.displayName = 'Tabs.Item';
export const Tabs = { Group: TabsComponent, Item: TabItem };