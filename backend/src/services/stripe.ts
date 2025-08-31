import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16'
    });
  }

  async getDisputes() {
    try {
      const disputes = await this.stripe.disputes.list({
        limit: 100,
        expand: ['data.payment_intent', 'data.charge']
      });

      return disputes.data.map(dispute => ({
        externalId: dispute.id,
        processor: 'STRIPE',
        amount: dispute.amount / 100, // Convert from cents
        currency: dispute.currency.toUpperCase(),
        reason: dispute.reason,
        status: this.mapStripeStatus(dispute.status),
        customerEmail: dispute.evidence?.customer_email_address,
        transactionDate: new Date(dispute.created * 1000)
      }));
    } catch (error) {
      console.error('Error fetching Stripe disputes:', error);
      throw error;
    }
  }

  async submitEvidence(disputeId: string, evidence: any) {
    try {
      const dispute = await this.stripe.disputes.update(disputeId, {
        evidence: evidence
      });
      return dispute;
    } catch (error) {
      console.error('Error submitting evidence to Stripe:', error);
      throw error;
    }
  }

  private mapStripeStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'needs_response': 'OPEN',
      'under_review': 'IN_PROGRESS',
      'won': 'RESOLVED',
      'lost': 'CLOSED'
    };
    return statusMap[status] || 'OPEN';
  }
}
