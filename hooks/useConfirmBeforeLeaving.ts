import { useEffect } from 'react';

export function useConfirmBeforeLeaving() {
  useEffect(() => {
    function handleRouteChange(event: BeforeUnloadEvent) {
      event.preventDefault();
      console.log('jay jay');
      event.returnValue =
        'The teams are currently being formed, are you sure you want to exit?';
    }

    function handlePopState(event: PopStateEvent) {
      console.log('hay hay');

      event.preventDefault();
      console.log('hay hay');
      if (
        !window.confirm(
          'The teams are currently being formed, are you sure you want to exit?',
        )
      ) {
        // Prevent navigation by re-pushing the current state
        history.pushState(null, document.title, location.href);
      }
    }

    window.addEventListener('beforeunload', handleRouteChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
