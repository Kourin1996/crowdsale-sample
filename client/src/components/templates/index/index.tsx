import React from 'react'
import { useCrowdsaleInfo } from '../../../hooks/crowdsale-info'
import { useCrowdsaleStatus } from '../../../hooks/crowdsale-status'
import { IcoCountDown } from '../../organisms/IcoCountdown'
import { IcoProgress } from '../../organisms/IcoProgress'
import { PurchaseModal } from '../purchase-modal'

const { Loader } = require('rimble-ui')

type IndexPageTemplateProps = {}

export const IndexPageTemplate: React.FC<IndexPageTemplateProps> = (_props) => {
  const { data: crowdsaleInfo } = useCrowdsaleInfo()
  const { data: crowdsaleStatus } = useCrowdsaleStatus()
  const isLoading = !crowdsaleInfo || !crowdsaleStatus

  return (
    <>
      <div
        className="flex items-center justify-center p-8 w-screen h-screen min-h-screen bg-cover"
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/img/background1.jpg")`,
        }}
      >
        <div
          className="backdrop-filter-blur-14 w-full max-w-7xl h-full bg-white bg-opacity-0 border border-solid border-white border-opacity-40 rounded-3xl"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.3) 2px 8px 8px',
            borderBottom: '1px rgba(40,40,40,0.35) solid',
            borderRight: '1px rgba(40,40,40,0.35) solid',
          }}
        >
          <div className="relative flex flex-col px-12 py-6 w-full h-full">
            <p
              className="mt-auto text-white text-5xl font-bold"
              style={{
                maxWidth: '600px',
              }}
            >
              Next Generation Trading Apps on Blockchain
            </p>
            <div
              className="backdrop-filter-blur-16 z-1 mt-16 p-8 w-3/4 h-full bg-white bg-opacity-5 border border-solid border-white border-opacity-40 rounded-3xl"
              style={{
                height: '360px',
                minWidth: '450px',
                boxShadow: 'rgba(0, 0, 0, 0.3) 2px 8px 8px',
                borderBottom: '1px rgba(40,40,40,0.35) solid',
                borderRight: '1px rgba(40,40,40,0.35) solid',
              }}
            >
              {isLoading && (
                <div
                  className="flex items-center justify-center"
                  style={{ height: '100%' }}
                >
                  <Loader size="40px" />
                </div>
              )}
              {!isLoading && (
                <>
                  <IcoCountDown />
                  <div className="mt-4">
                    <IcoProgress />
                  </div>
                  <div className="mt-6">
                    <PurchaseModal />
                  </div>
                </>
              )}
            </div>
            <div className="absolute z-0 right-5" style={{ bottom: '-20px' }}>
              <img
                alt="logo"
                src={`${process.env.PUBLIC_URL}/img/top-image.png`}
                style={{
                  height: '400px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
