import React from 'react';
import {Flex} from "@chackra-ui/core";


export default function Container ({children}) {
    return (
        <>
          <Flex as='main' justifyContent="center" flexDirection="column" px={8}>
              {children}
          </Flex>
        </>
    )
}
