import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import BuyMeACoffeeABI from '../../_contracts/BuyMeACoffeeABI';
import { BUY_MY_COFFEE_CONTRACT_ADDR } from '../../config';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

